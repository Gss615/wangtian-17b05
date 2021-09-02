import React from 'react';
import _ from 'lodash';

import {withPrefix} from '../utils';

export default class PictureBig extends React.Component {
    render() {
        let image = _.get(this.props, 'image', null);
        let alt = _.get(this.props, 'alt', null);
        let cssClass = _.get(this.props, 'cssClass', null);
        return (
            image && (
                <div class='picture'>
                    <picture class='img'>
                        <img src={withPrefix(image)} {...(alt ? ({ alt: alt }) : null)}  {...(cssClass ? ({ className: cssClass }) : null)} />
                    </picture>
                </div>
            )
        );
    }
}

// function
