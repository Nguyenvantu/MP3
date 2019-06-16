import React from 'react';
import { Progress } from 'antd';
import { changeAlias } from '../../utils/func';

const Track = (props) => {
  const {
    name,
    id,
    downloadProgress,
    download, t
  } = props;
  return (
    downloadProgress !== undefined && downloadProgress !== -1
      ? <Progress type="circle" percent={downloadProgress} />
      :
      <button className='sc-ir' onClick={() => download({ songName: changeAlias(name), id })}>
        <i className="ion-android-download" title={t('download')} />
      </button>
  )
};

export default Track;
