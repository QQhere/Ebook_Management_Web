import React from 'react';
import Chapter from './Chapter';

const TabletOfContents = (props) => {
    const data = props.data;
    return (
        <div className="listcolumn">
            {data.map((item, index) => {
                return (
                    <Chapter data={item.name} type={props.type}></Chapter>
                );
            })}
        </div>
    );
};

export default TabletOfContents;