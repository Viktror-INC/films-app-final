import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import classNames from 'classnames';
import SearchWidget from './components/searchWidget/searchWidget';
import AnimeBlock from './components/AnimeBLock/AnimeBlock';
import { useSelector } from 'react-redux';
import { getData } from './api/getData/getData';
import Header from './components/Header/Header';
import { TStore } from './store/@types';
import { TPosts } from './components/AnimeBLock/@types';

function App() {
  const [posts, setPosts] = useState([] as TPosts);
  const [allowSent, setAllowSent] = useState(false);
  const [search, setSearch] = useState('');

  let variables = {
    search: search,
    page: 1,
    perPage: 3,
  };

  const query = `
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search) {
      id
      bannerImage
      title {
        english
        native
      }
    }
  }
}
`;
  const url = 'https://graphql.anilist.co';

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };

  const likedAnime = useSelector(
    (state: TStore) => state.likedSlice.likedAnime
  );

  const addAnime = async () => {
    variables = { ...variables, page: variables.page + 1 };
    options = {
      ...options,
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };
    const data = await getData({ url, options });

    console.log('data.Page.media', data);

    if (data.Page.pageInfo !== variables.page) {
      setAllowSent(false);
    }
    console.log('working');
    const updatedData = posts.concat(data.Page.media);
    return setPosts(updatedData);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(search);
      const getResponseData = async () => {
        const data = await getData({ url, options });
        setPosts(data.Page.media);
      };

      getResponseData();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="App">
      <Header />
      <div className={classNames('container', 'main')}>
        <h2>Список аниме</h2>
        <SearchWidget
          value={search}
          onChange={(event) => {
            setAllowSent(true);
            setSearch(event.target.value);
          }}
          clearSearch={() => {
            setAllowSent(false);
            setSearch('');
          }}
        />
        <AnimeBlock posts={posts} />
        <button
          disabled={!allowSent}
          className="moreButton"
          onClick={() => addAnime()}
        >
          More{' '}
          <img
            width={24}
            height={24}
            src={require('../src/images/more.png')}
            alt="more"
          />
        </button>
        <h2>Любимое аниме</h2>
        <AnimeBlock posts={likedAnime} verticalView removeButton />
      </div>
    </div>
  );
}

export default App;
