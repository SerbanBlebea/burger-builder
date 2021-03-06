import React from 'react';
import { Price } from '../exports.js';
import './IngredientList.css';

function IngredientList(props)
{
    let list = props.ingredients.map((ingredient, index)=> {
        return (
            <li
                key={index}
                className='IngredientList'>
                <span style={{fontWeight: 'bold', color: '#0069D9'}}>{ingredient.count}x</span> {ingredient.name} ( £{ingredient.price * ingredient.count} )
            </li>
        );
    });

    return (
        <div className='IngredientListPanel'>
            <h4 className='IngredientListTitle'>Ingredient list:</h4>
            <ul className='IngredientListUl'>
                {list}
            </ul>
            <div className='IngredientListTotal'>
                <Price>Total {props.price}£</Price>
            </div>
        </div>
    );
}

export default IngredientList;
