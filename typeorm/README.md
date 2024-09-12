# Process de creation de la base de données

Utilisation de pgadmin 4 et de son tool de diagram pour bdd pour générer le schema de bdd
Export et placer le fichier schema.sql dans le bon dossier


# Process génération typeorm models

Run la commande node scripts/generate-models.js -> création des entity dans dossier src/entity/**.ts

# Process creation migrations :

FIRST TIME ONLY :

npm run typeorm migration:create src/migrations/init ->  Create firt mempty migration

SINON :

Run npm run typeorm migration:generate -- ./src/migrations/migration -d ./src/data-source.ts -> create migrations based on entities and datasource
Run npm run typeorm migration:run -- -d ./src/data-source.ts -> apply pending migrations to db
Run npm run typeorm migration:revert -- -d ./src/data-source.ts -> revert migrations to db


NEXT STEP -> create a script called build-schema -> do all that