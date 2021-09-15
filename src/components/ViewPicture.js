import React from 'react';
import _ from 'lodash';

import { withPrefix } from '../utils';

export default class Picture extends React.Component {
    render() {
        let image = _.get(this.props, 'image', null);
        let alt = _.get(this.props, 'alt', null);
        const list = _.map(_.get(this.props, 'pageContext.frontmatter.other4.images'), (value, key) => {
            const result = { value, key }
            return result
        })[0];
        return (
            image && (
                <div className='view_content'>
                    <div className='view_box'>
                        <picture className='view_picture'>
                            <img src={withPrefix(image)} {...(alt ? ({ alt: alt }) : null)} />
                        </picture>
                    </div>
                    <div className='small_picture'>
                        <ul>
                            {_.map(list.value, (item, key) => {
                                return (
                                    <li key={key} className={this.props.activeKey === key ? 'img_active' : ''} onClick={() => this.props.activePic(key)}>
                                        <div className='img_box'>
                                            <img src={`/huawei/image/${list.key}/${item}`} alt={key} />
                                        </div>
                                    </li>)
                            })}
                        </ul>
                    </div>
                </div>

            )
        );
    }
}

