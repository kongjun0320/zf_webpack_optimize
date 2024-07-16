document.getElementById('video').addEventListener('click', () => {
  import(/* webpackPrefetch: true */ './title').then((res) => {
    console.log(res.default);
  });
});
