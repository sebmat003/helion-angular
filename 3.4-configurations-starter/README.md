# Tips

- install prettier (if don't have it)
- install eslint (ng add @angular-eslint/schematics)
- install stylelint (npm i stylelint stylelint-scss stylelint-config-standard postcss-scss)
- add .eslintrc.json, .stylelintrc.json to the main folder
- add lint config in angular.json
- add scripts in package.json

HUSKY:

- npm lint-staged husky
- be sure to have correct a path for installing husky folder ("prepare": "cd ../../ && husky install")
- add lint-staged config in package.json to check for eslint, stylelint and prettier rules
