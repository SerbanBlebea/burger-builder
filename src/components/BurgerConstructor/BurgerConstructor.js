import React from 'react';
import { Button } from '../exports.js';
import './BurgerConstructor.css';

function BurgerConstructor(props)
{
    let buttons = props.ingredients.map((ingredient, index)=> {
        return (
            <Button
                key={index}
                click={props.add.bind(this, index)}
                type={'primary'}
                disabled={props.limit}
                margin={5}>{ingredient.name} £{ingredient.price}</Button>
        );
    })

    return (
        <div className='BurgerConstructorPanel'>
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
    );
}

export default BurgerConstructor;
