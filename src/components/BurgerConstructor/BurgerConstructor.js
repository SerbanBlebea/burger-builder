import React from 'react';
import { Button } from '../exports.js';
import './BurgerConstructor.css';

function BurgerConstructor(props)
{
    console.log(props)
    let buttons = props.ingredients.map((ingredient, index)=> {
        return (
            <Button
                key={index}
                click={props.add.bind(this, index)}
                type={'primary'}
                disabled={false}
                margin={5}>+{ingredient.name} £{ingredient.price}</Button>
        );
    })

    return (
        <div className='card BurgerConstructorPanel'>
            <div className='card-body BurgerConstructor'>
                <div className='row'>
                    <Button
                        click={props.reset.bind(this)}
                        type={'danger'}
                        margin={5}>Reset</Button>
                    {buttons}
                    <Button
                        click={props.modal.bind(this)}
                        type={'success'}
                        disabled={(props.price < 1) ? true : false}
                        margin={5}>{(props.price < 1) ? 'Buy' : `Buy £${props.price}`}</Button>
                </div>
            </div>
        </div>
    );
}

export default BurgerConstructor;
