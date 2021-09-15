import React from 'react';
import _ from 'lodash';

import { withPrefix } from '../utils';
// 动画
function animate(el,init,final,isLeft){
    let timer= setInterval(()=>{
        if(isLeft){ 
            if(init  < final){
                el.style.left = `-${final}px`
                return clearInterval(timer)
            }
            init+=  -3
            el.style.left = `${init}px`
        }else{
            init += 3
            if(init > final){
                el.style.left =`${final}px`
                return clearInterval(timer)
            }
            el.style.left = `${init}px`
        }
    },10)
}

export default class Picture extends React.Component {
    constructor(props){
        super(props)
        this.hanldClick = this.hanldClick.bind(this)
    }
    hanldClick(e,el){
        let $ul = el.target.parentElement.children[1].firstChild
        let {scrollWidth,offsetLeft,offsetWidth} = $ul
        if(e === 'left'){
            // TODO 为考虑预览图过多且超过两个容器可视宽度的状况
            animate($ul,offsetLeft,-(scrollWidth - offsetWidth),true)
        }else if(e==='right'){
            if((+offsetLeft) > scrollWidth){
                animate($ul,offsetLeft,offsetLeft + scrollWidth,false)
            }else{
                animate($ul,offsetLeft,0,false)
            }
        }
    }
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
                        <span onClick={(el)=>this.hanldClick('right',el)} className="view_left">{'<'}</span>
                        <div className="ul_box">
                            <ul >
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
                        
                        <span onClick={(el)=>this.hanldClick('left',el)} className='view_right'>{'>'}</span>
                    </div>
                </div>

            )
        );
    }
}

