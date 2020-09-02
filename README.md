[![Build Status](https://travis-ci.org/mrstebo/plop-merge-json-action.svg?branch=master)](https://travis-ci.org/mrstebo/plop-merge-json-action)
[![npm version](https://badge.fury.io/js/plop-merge-json-action.svg)](https://badge.fury.io/js/plop-merge-json-action)
[![Coverage Status](https://coveralls.io/repos/github/mrstebo/plop-merge-json-action/badge.svg?branch=master)](https://coveralls.io/github/mrstebo/plop-merge-json-action?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/mrstebo/plop-merge-json-action/badge.svg?targetFile=package.json)](https://snyk.io/test/github/mrstebo/plop-merge-json-action?targetFile=package.json)

# plop-merge-json-action
A plop action for merging JSON

## Quick Start

To enable the use of this action you will need to add the following to your plopfile:

```javascript
const { MergeJsonAction } = require("plop-merge-json-action");

module.exports = (plop) => {
  // ...
  MergeJsonAction(plop);
  // ...
};
```
