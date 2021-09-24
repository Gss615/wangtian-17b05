import React from 'react';
import _ from 'lodash';

import NavCategories from './NavCategories';
import {getPages} from '../utils';
import ProductGridStore from './ProductGridStore';

export default class StoreSection extends React.Component {
    constructor(props){
        super(props)
        this.hanldClick = this.hanldClick.bind(this)
        this.state={activeItem:'123'}

    }
    hanldClick(ele){
        console.log('---',this.state,ele)
        this.setState({activeItem:ele})
    }
    render() {
        console.log('render',this.props)
        let activeItem = _.split(_.get(this.props,'category_url'),'/')[2] || '所有产品'
        let page = _.get(this.props, 'page', null);
        let section = _.get(this.props, 'section', null);
        let category_url = _.get(this.props, 'category_url', null);
        let product_pages = _.orderBy(getPages(this.props.pageContext.pages, '/products'), 'frontmatter.order');
        return (
            <section className="content__row" data-id={_.get(section, 'section_id', null)}>
                <div className="content__row content__row--direction-row store__head">
                    <h1 className="store__title">{activeItem}</h1>
                </div>
                <div className="content__row store__container">
                    <nav className="store__nav">
                        <NavCategories {...this.props} page={page} site={this.props.pageContext.site} handle={this.hanldClick} />
                    </nav>
                    <section className="store__products">
                        <ProductGridStore {...this.props} product_pages={product_pages} category_url={category_url} cssClass={'store__product-grid'} site={this.props.pageContext.site} />
                    </section>
                </div>
            </section>
        );
    }
}
