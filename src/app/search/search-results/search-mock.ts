// let searchQueryRes =
//     [{ "postId": "q32ae1518", "questionHeader": "Using an Angular 2 http.post without subscribing? Or am I thinking of it wrong?", "questionBody": "**Is there a way to just tell the server to update data without subscribing? Skipping a return statement and a subscription seems to render the http call inert.**\n\nIn my case, my DB guy created a bunch of stored procedures that return nothing and sometimes I want to do something simple like this in my service:\n\n    public setItem(item: IRequestItem) {\n            this.http.post('api/items', item);\n        }\n\nand call it like this in my component:\n\n    save() {\n            var comp = this;\n            this.items.forEach(function(item) {\n                comp.service.setItem(item)\n            });\n        }\n\nInstead I have to do something like this in the service: \n\n    public setItem(item: IRequestItem) {\n            return this.http.post('api/items', item);\n        }\n\nAnd then call it like this in the conponent:\n\n    save() {\n            var comp = this;\n            this.items.forEach(function(item) {\n                comp.service.setItem(item).subscribe(r => console.log(r));\n            });\n        }\n\nWhich would return lots of these:\n\n    Response {_body: \"\", status: 204, ok: true, statusText: \"No Content\", headers: Headers…}\n    _body : \"\"\n    headers : Headers\n    ok : true\n    status : 204\n    statusText : \"No Content\"\n    type : 2\n    url : \"http://localhost:56018/api/items\"\n    __proto__ : Object\n\nI'm just learning so maybe I'm looking at it wrong. Can I interpret something in that Response object that will let me know if the operation failed or succeeded? Or is there another syntax that will just return a success or failure instead of the confusing \"No Content\" response?", "answerBody": null, "postedBy": "test", "postedAt": "2020-03-15T03:58:25.366Z", "forQuestion": null, "upVotes": 0, "downVotes": 0, "usersInteracted": {}, "commentObj": [] }, { "postId": "qd75f630d", "questionHeader": "How to solve catch error in Observable in angular 8? I do error handler code, but I got error in catch. undefined method.", "questionBody": "Best way to catch error on observable is:\n\n    this.http.get<user[]>(this.url).pipe(\n       tap(),\n       catchError(err => { return this.errorHandler(err) }\n    )\n\nIf `this.http.get()` is an Promise lave it like You did in Your code `.catch(...)` is ok. Try to have `catchError(...)` at the end of pipe or before `finalize(..)` if You use it.\n\nBefore Observables had no `.pipe()` and You where chaining operations like in Promises so they change name `.then()` to i think `flatMap()` and `.catch()` to `catchError()` So programmer know are it is Observable or Promise.", "answerBody": null, "postedBy": "foo", "postedAt": "2020-03-08T11:34:10.261Z", "forQuestion": null, "upVotes": 0, "downVotes": 0, "usersInteracted": {}, "commentObj": [] }, { "postId": "qb2552cc6", "questionHeader": "Catch error in combined pipe of lettable rxjs operators", "questionBody": "We've just upgraded one of our applications to Angular 5, and started to transition into [lettable operators](https://github.com/ReactiveX/rxjs/blob/master/doc/lettable-operators.md) as introduced in rxjs v5.5.\n\nBecause of this, we have rewritten our observable pipelines to the new syntax with the `.pipe()` operator.\n\nOur previous code would look like this, with a `.catch()` inside the `.switchMap()` as to not interrupt the running of effects if an error is thrown.\n\n    @Effect()\n    loadData$ = this.actions$\n    .ofType(LOAD_DATA)\n    .map((action: LoadData) => action.payload)\n    .withLatestFrom(this.store.select(getCultureCode))\n    .switchMap(([payload, cultureCode]) => this.dataService.loadData(payload, cultureCode)\n      .map(result => {\n        if (!result) {\n          return new LoadDataFailed('Could not fetch data!');\n        } else {\n          return new LoadDataSuccessful(result);\n        }\n      })\n      .catch((err, caught) => {\n        return Observable.empty();\n      });\n      );\n\nIn the case of an error thrown in the call to the `dataService` it would be caught and handled (simplified the error handling here).\n\nWith the new syntax and use of `.pipe()`, we now have this\n\n    @Effect()\n    loadData$ = this.actions$\n    .ofType(LOAD_DATA)\n    .pipe(\n      map((action: LoadData) => action.payload),\n      withLatestFrom(this.store.select(getCultureCode)),\n      switchMap(([payload, cultureCode]) => this.dataService.loadData(payload, cultureCode)),\n      map(result => {\n        if (!result) {\n          return new LoadDataFailed('Could not fetch data!');\n        } else {\n          return new LoadDataSuccessful(result);\n        }\n      })\n      );\n\n\nHow can I in a similar fashion catch any thrown errors in the observable pipeline, using the new syntax?", "answerBody": null, "postedBy": "foo", "postedAt": "2020-03-15T13:19:53.176Z", "forQuestion": null, "upVotes": 0, "downVotes": 0, "usersInteracted": {}, "commentObj": [] }];

// export const searchResults =
//     [{ "postId": "q32ae1518", "questionHeader": "Using an Angular 2 http.post without subscribing? Or am I thinking of it wrong?", "questionBody": "**Is there a way to just tell the server to update data without subscribing? Skipping a return statement and a subscription seems to render the http call inert.**\n\nIn my case, my DB guy created a bunch of stored procedures that return nothing and sometimes I want to do something simple like this in my service:\n\n    public setItem(item: IRequestItem) {\n            this.http.post('api/items', item);\n        }\n\nand call it like this in my component:\n\n    save() {\n            var comp = this;\n            this.items.forEach(function(item) {\n                comp.service.setItem(item)\n            });\n        }\n\nInstead I have to do something like this in the service: \n\n    public setItem(item: IRequestItem) {\n            return this.http.post('api/items', item);\n        }\n\nAnd then call it like this in the conponent:\n\n    save() {\n            var comp = this;\n            this.items.forEach(function(item) {\n                comp.service.setItem(item).subscribe(r => console.log(r));\n            });\n        }\n\nWhich would return lots of these:\n\n    Response {_body: \"\", status: 204, ok: true, statusText: \"No Content\", headers: Headers…}\n    _body : \"\"\n    headers : Headers\n    ok : true\n    status : 204\n    statusText : \"No Content\"\n    type : 2\n    url : \"http://localhost:56018/api/items\"\n    __proto__ : Object\n\nI'm just learning so maybe I'm looking at it wrong. Can I interpret something in that Response object that will let me know if the operation failed or succeeded? Or is there another syntax that will just return a success or failure instead of the confusing \"No Content\" response?", "answerBody": null, "postedBy": "test", "postedAt": "2020-03-15T03:58:25.366Z", "forQuestion": null, "upVotes": 2, "downVotes": 0, "voteStatus": 0, "usersInteracted": { "test": 2, "foo": 2 }, "commentObj": [{ "commentId": "c15ccc325", "commentBody": "C1 for angular", "byUser": "test", "postedAt": "2020-03-21T12:25:44.303Z", "upVotes": 1, "downVotes": 0, "voteStatus": 0, "usersInteracted": { "gsg7397": 2 } }] }, { "postId": "qd75f630d", "questionHeader": "How to solve catch error in Observable in angular 8? I do error handler code, but I got error in catch. undefined method.", "questionBody": "Best way to catch error on observable is:\n\n    this.http.get<user[]>(this.url).pipe(\n       tap(),\n       catchError(err => { return this.errorHandler(err) }\n    )\n\nIf `this.http.get()` is an Promise lave it like You did in Your code `.catch(...)` is ok. Try to have `catchError(...)` at the end of pipe or before `finalize(..)` if You use it.\n\nBefore Observables had no `.pipe()` and You where chaining operations like in Promises so they change name `.then()` to i think `flatMap()` and `.catch()` to `catchError()` So programmer know are it is Observable or Promise.", "answerBody": null, "postedBy": "foo", "postedAt": "2020-03-08T11:34:10.261Z", "forQuestion": null, "upVotes": 0, "downVotes": 0, "voteStatus": 0, "usersInteracted": {}, "commentObj": [] }, { "postId": "qb2552cc6", "questionHeader": "Catch error in combined pipe of lettable rxjs operators", "questionBody": "We've just upgraded one of our applications to Angular 5, and started to transition into [lettable operators](https://github.com/ReactiveX/rxjs/blob/master/doc/lettable-operators.md) as introduced in rxjs v5.5.\n\nBecause of this, we have rewritten our observable pipelines to the new syntax with the `.pipe()` operator.\n\nOur previous code would look like this, with a `.catch()` inside the `.switchMap()` as to not interrupt the running of effects if an error is thrown.\n\n    @Effect()\n    loadData$ = this.actions$\n    .ofType(LOAD_DATA)\n    .map((action: LoadData) => action.payload)\n    .withLatestFrom(this.store.select(getCultureCode))\n    .switchMap(([payload, cultureCode]) => this.dataService.loadData(payload, cultureCode)\n      .map(result => {\n        if (!result) {\n          return new LoadDataFailed('Could not fetch data!');\n        } else {\n          return new LoadDataSuccessful(result);\n        }\n      })\n      .catch((err, caught) => {\n        return Observable.empty();\n      });\n      );\n\nIn the case of an error thrown in the call to the `dataService` it would be caught and handled (simplified the error handling here).\n\nWith the new syntax and use of `.pipe()`, we now have this\n\n    @Effect()\n    loadData$ = this.actions$\n    .ofType(LOAD_DATA)\n    .pipe(\n      map((action: LoadData) => action.payload),\n      withLatestFrom(this.store.select(getCultureCode)),\n      switchMap(([payload, cultureCode]) => this.dataService.loadData(payload, cultureCode)),\n      map(result => {\n        if (!result) {\n          return new LoadDataFailed('Could not fetch data!');\n        } else {\n          return new LoadDataSuccessful(result);\n        }\n      })\n      );\n\n\nHow can I in a similar fashion catch any thrown errors in the observable pipeline, using the new syntax?", "answerBody": null, "postedBy": "foo", "postedAt": "2020-03-15T13:19:53.176Z", "forQuestion": null, "upVotes": 0, "downVotes": 0, "voteStatus": 0, "usersInteracted": {}, "commentObj": [] }] 