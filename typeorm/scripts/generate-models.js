const { exec } = require('child_process');

function runCommandAsync(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

async function main() {
  let containerWasCreated = false;
  try {

    const sqlScriptName = 'schema.sql';

    // Create postgres temporary container
    const containerCommand = `podman run --name postgres-db-generate-models -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=postgres-db-generate-models -p 5432:5432 --mount type=bind,src=./${sqlScriptName},dst=/${sqlScriptName} -d postgres`;
    await runCommandAsync(containerCommand);
    containerWasCreated = true;

    // Wait for container to be up and running
    const MAX_CONNECTION_TRIES = 30;
    let nbConnectionTries = 1;
    let databaseUpAndReady = false;

    console.log(`Connecting to database ...`);
    while (!databaseUpAndReady && MAX_CONNECTION_TRIES >= nbConnectionTries) {

      try {
        const stdout = await runCommandAsync('podman exec postgres-db-generate-models psql -U admin postgres-db-generate-models -c "\\l"', { encoding: 'utf8' });
      } catch (error) {

        if (nbConnectionTries > MAX_CONNECTION_TRIES) throw new Error("Failed to connect to the database.");
        
        if (error.message.includes('the database system is starting up')) {
          nbConnectionTries += 1;
          setTimeout(() => {}, 1000);
        } else {
          databaseUpAndReady = true;
        }

      }
    }
    console.log("Connexion to the database succesful !")


    // Excute sql script
    const sqlCommand = `podman exec postgres-db-generate-models psql -U admin postgres-db-generate-models -f /${sqlScriptName}`;
    await runCommandAsync(sqlCommand);

    // Generate typescript types
    const tsTypescommand = `npx typeorm-model-generator -h localhost -d postgres-db-generate-models -u admin -x admin -p 5432 -e postgres -o ./src`;
    await runCommandAsync(tsTypescommand);
    console.log('Types generated !');

    // Kill and remove the container
    const killContainerCommand = 'podman kill postgres-db-generate-models && podman rm postgres-db-generate-models';
    await runCommandAsync(killContainerCommand);
    console.log('Container killed and removed.');

  } catch (error) {
    console.error(error);
    if (containerWasCreated) await runCommandAsync('podman kill postgres-db-generate-models && podman rm postgres-db-generate-models');
  }
}

main();