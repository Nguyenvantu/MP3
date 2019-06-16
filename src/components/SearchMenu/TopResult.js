import React from 'react';
import { Link } from 'react-router-dom';
import { changeAlias } from '../../utils/func';

function TopResult({ name, id, artist, thumb, clearSearchResult, name_stripviet, type, t }) {
  let link = type !== 'song' ? 
      (type !== 'album' ? `/nghe-si/${name_stripviet}`
      : `/album/${changeAlias(name)}/${id}`)  
    : `/bai-hat/${changeAlias(name)}/${id}`;
  return (
    <ul className='top-result'>
      <div className='search-li-title'>
        {t('topRs')}
      </div>
      <li>
        <div className='search-li-detail'>
          <Link
            to={link}
            onClick={clearSearchResult} title={name}
          >
            <img src={`http://zmp3-photo-td.zadn.vn/thumb/94_94/${thumb}`} alt='' />
          </Link>
          <div className='search-li-info'>
            <div title={name}>
              <Link
                to={link}
                onClick={clearSearchResult}
              >{name}</Link>
            </div>
            {!!artist &&
            <div className='search-li-artist' title={artist}>
              {artist}
            </div>}
          </div>
        </div>
      </li>
    </ul>
  );
}

export default TopResult;
