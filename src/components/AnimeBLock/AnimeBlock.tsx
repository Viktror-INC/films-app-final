import React from 'react';
import { TAnimeBlock, TPost } from './@types';
import './AnimeBlock.scss';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { TStore } from '../../store/@types';
import { setLikedAnime } from '../../store/slices/likedSlice/likedSlice';

export default function AnimeBlock(props: TAnimeBlock) {
  const { posts, removeButton = false, verticalView = false } = props;

  const likedAnime = useSelector(
    (state: TStore) => state.likedSlice.likedAnime
  );
  const dispatch = useDispatch();

  const onLikedAnime = (item: TPost) => {
    if (!likedAnime.filter((anime) => anime.id === item.id)[0]) {
      return dispatch(setLikedAnime([...likedAnime, item]));
    }
    dispatch(setLikedAnime(likedAnime.filter((anime) => anime.id !== item.id)));
  };

  return (
    <ul
      className={classNames('amimeBlock', {
        amimeBlockVertical: verticalView,
      })}
    >
      {posts.map((item, index) => {
        return (
          <li key={index}>
            <img
              width={373}
              height={179}
              src={item.bannerImage}
              alt={`there showed ${item.title}`}
            />
            <div className="textBlock">
              <span className="animeBlockTitle">{item.title.english}</span>
              <span className="animeBlockTitle">{item.title.native}</span>
            </div>
            <button
              className={classNames('amimeBlockButton', {
                activeAnimeBlockButton: !!likedAnime.filter(
                  (anime) => anime.id === item.id
                )[0],
                removeAnimeBlockButton: removeButton,
              })}
              onClick={() => {
                onLikedAnime(item);
              }}
            ></button>
          </li>
        );
      })}
    </ul>
  );
}
