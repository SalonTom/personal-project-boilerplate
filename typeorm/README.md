# Process de creation de la base de données

Utilisation de pgadmin 4 et de son tool de diagram pour bdd pour générer le schema de bdd
Export et placer le fichier schema.sql dans le bon dossier


# Process génération typeorm models

FIRST TIME ONLY :

npx typeorm migration:create ./src/migrations/migration

SINON : 

Run la commande node scripts/generate-models.js -> création des entity dans dossier src/entity/**.ts
Run npx tsc -> transpile ts files from ts to js

# Process creation migrations :

Run npx typeorm migration:generate ./src/migrations/migration -d ./build/data-source.js -> create migrations ts files based on data source js and models js
RUN npx tsc -> transpile ts newly created migrations file to js
Run npx typeorm migration:run -d ./build/data-source.js -> apply pending migrations to db
Run npx typeorm migration:revert -d ./build/data-source.js -> revert recently applied migrations



NEXT STEP -> create a script called build-schema -> do all that