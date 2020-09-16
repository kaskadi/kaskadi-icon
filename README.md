![](https://img.shields.io/github/package-json/v/kaskadi/kaskadi-icon)
![](https://img.shields.io/badge/code--style-standard-blue)
![](https://img.shields.io/github/license/kaskadi/kaskadi-icon?color=blue)

[![](https://img.shields.io/badge/live-example-orange)](https://cdn.klimapartner.net/modules/%40kaskadi/kaskadi-icon/example/index.html)

**GitHub Actions workflows status**

[![Build status](https://img.shields.io/github/workflow/status/kaskadi/kaskadi-icon/build?label=build&logo=mocha)](https://github.com/kaskadi/kaskadi-icon/actions?query=workflow%3Abuild)
[![BuildFF status](https://img.shields.io/github/workflow/status/kaskadi/kaskadi-icon/build-on-firefox?label=firefox&logo=Mozilla%20Firefox&logoColor=white)](https://github.com/kaskadi/kaskadi-icon/actions?query=workflow%3Abuild-on-firefox)
[![BuildChrome status](https://img.shields.io/github/workflow/status/kaskadi/kaskadi-icon/build-on-chrome?label=chrome&logo=Google%20Chrome&logoColor=white)](https://github.com/kaskadi/kaskadi-icon/actions?query=workflow%3Abuild-on-chrome)
[![Publish status](https://img.shields.io/github/workflow/status/kaskadi/kaskadi-icon/publish?label=publish&logo=Amazon%20AWS)](https://github.com/kaskadi/kaskadi-icon/actions?query=workflow%3Apublish)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/kaskadi-icon?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/kaskadi-icon)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/kaskadi-icon?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/kaskadi-icon)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/kaskadi-icon?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/kaskadi-icon)

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/kaskadi-icon?label=code%20quality&logo=LGTM)](https://lgtm.com/projects/g/kaskadi/kaskadi-icon/?mode=list&logo=LGTM)

****

# Testing

`mocha`, `chai`, `standard` & `karma` are available as dev dependencies.

A `build` workflow (see [here](./.github/workflows/build.yml)) along with individual [`build-on-chrome`](./.github/workflows/buildChrome.yml) and [`build-on-firefox`](./.github/workflows/buildFF.yml) workflows are running on `pull request` and will execute your test suite before allowing you to merge your PR. It also has a `coverage` job already prepared that you can comment out as soon as your testing is in place and your `REPORTER_ID` is in the repository secrets. This is the ID on _Code Climate_ used for uploading code coverage reports.

****

# Publishing

Publishing to CDN is done automatically via a `publish` workflow (see [here](./.github/workflows/publish.yml)). This workflow will run on `push` to `master`. It uses our internal action `action-s3cp` and a `kaskadi.s3-push` configuration field in `package.json`. See [here](https://github.com/kaskadi/action-s3cp) for more details on how to use this action.

****

:point_down: **Your documentation here** :point_down:
