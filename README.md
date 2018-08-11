The client and server share generated interfaces from the jsonschema files in `schema`.
If you update the json schema you will need to run the following at the root of the repository:
```
npm run sync-shared
```

This should also be run on the postmerge hook so these should be generated automatically when doing a pull or manual merge.