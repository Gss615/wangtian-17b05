// 首页产品图片


import React from 'react';
import _ from 'lodash';

import { Link, withPrefix, getPageByFilePath } from '../utils';
import PictureBig from './PictureBig';
// import SmallBuyButton from './SmallBuyButton';

export default class ProductGridItem extends React.Component {

    render() {

        const product_page = _.get(this.props, 'product_page', null);
        const img = _.map(_.get(product_page, 'frontmatter.other4.images'), (value, key) => {
            const result = { value, key}
            return result
         })[0];
        const imgurl = img ? `huawei/image/${img.key}/${img.value[0]}`:'';
        return (
            <li className="product-grid__item">
                <figure className="product-grid__item-figure">
                    <Link className="product-grid__item-link" to={withPrefix(_.get(product_page, 'url', null))}>
                        <PictureBig {...this.props} image={imgurl} alt={_.get(product_page, 'frontmatter.title', null)} cssClass={'product-grid__item-image'} />
                    </Link>
                    {/* <figcaption>
                        <SmallBuyButton {...this.props} product_page={product_page} component={'product-grid'} />
                    </figcaption> */}
                </figure>
                <div className="product-grid__definition">
                    <Link to={withPrefix(_.get(product_page, 'url', null))}><h3 className="product-grid__title">{_.get(product_page, 'frontmatter.title', null)}</h3></Link>
                    {_.get(product_page, 'frontmatter.category', null) && ((() => {
                        let category_page = getPageByFilePath(this.props.pageContext.pages, _.get(product_page, 'frontmatter.category', null));
                        return (
                            <span className="product-grid__category"> {_.get(category_page, 'frontmatter.title', null)} </span>
                        );
                    })())}
                </div>
            </li>
        );
    }
}
