# Code Review: Meme Feed

## Loading Time issue analysis

After the user login, the application is waiting for the full list of memes & comments to be loaded before displaying anything. Moreover, every single comment triggers a call to retrieve the data of the same user, which means a lot of calls to retrieve the same exact data.

### Suggested improvements

- State Management : implement a solution that will allow for data to be retrieved asynchronously while connected to the UI (using [React Context API](https://react.dev/learn/passing-data-deeply-with-context), or more sophisticated Store solutions like [Zustand](https://github.com/pmndrs/zustand), or [Redux](https://redux.js.org/).)

- Lazy Loading : We don't need to wait for all the data to be loaded before displaying it. To improve performance, especially [Core Web Vitals](https://web.dev/articles/vitals?hl=fr#core-web-vitals), a good practice is to display the largest part of content above the fold as soon as possible, and delay the rest. In that case, there is already pagination implemented on the API, so we can only retrieve page 1 first, and the rest later. (Other solutions could be : load next page on user action only, by adding a "Load More" button, or infinite scrolling)

- Split Components : Create Sub-Components that follow the [Single-responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle) and allow for more code readability and reusability. (Read also : [Why Split Components ?](https://thiraphat-ps-dev.medium.com/splitting-components-in-react-a-path-to-cleaner-and-more-maintainable-code-f0828eca627c#:~:text=Splitting%20components%20is%20a%20key,and%20testability%20in%20your%20applications.) & [Keep it DRY (Don't repeat yourself)](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) )

- Data Caching : Caching user data instead of performing useless calls. (Before doing so, we can already optimize the API calls by fetching the data once per user per page.)
