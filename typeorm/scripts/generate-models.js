const { exec } = require('child_process');
const path = require('path');

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
    const pathToScript = path.resolve(sqlScriptName);

    // Create postgres temporary container
    const containerCommand = `docker run --name postgres-db-generate-models -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=postgres-db-generate-models -p 5434:5432 --mount type=bind,src=${pathToScript},dst=/${sqlScriptName} -d postgres`;
    await runCommandAsync(containerCommand);
    containerWasCreated = true;

    // Wait for container to be up and running
    const MAX_CONNECTION_TRIES = 30;
    let nbConnectionTries = 1;
    let databaseUpAndReady = false;

    console.log(`Connecting to database ...`);

    const interval = setInterval(async () => {
      if (!databaseUpAndReady && MAX_CONNECTION_TRIES >= nbConnectionTries) {
        try {
          console.log("Try #%d", nbConnectionTries);
          
          // Excute sql script
          await runCommandAsync(`docker exec postgres-db-generate-models psql -U admin postgres-db-generate-models -f /${sqlScriptName}`);
          databaseUpAndReady = true;
        } catch (error) {
  
          if (nbConnectionTries > MAX_CONNECTION_TRIES) throw new Error("Failed to connect to the database.");
  
          nbConnectionTries += 1;
        }
      } else if (databaseUpAndReady) {
        clearInterval(interval);
        console.log("Connexion to the database and sql script run succesful !");
      }
    }, 1000);

    // Generate typescript types
    const tsTypescommand = `npx typeorm-model-generator -h localhost -d postgres-db-generate-models -u admin -x admin -p 5434 -e postgres -o ./src`;
    await runCommandAsync(tsTypescommand);
    console.log('Types generated !');

    // Kill and remove the container
    const killContainerCommand = 'docker kill postgres-db-generate-models && docker rm postgres-db-generate-models';
    await runCommandAsync(killContainerCommand);
    console.log('Container killed and removed.');

  } catch (error) {
    console.error(error);
    if (containerWasCreated) await runCommandAsync('docker kill postgres-db-generate-models && docker rm postgres-db-generate-models');
  }
}

main();