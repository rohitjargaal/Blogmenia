import React, { useState } from 'react'

function SearchProfile() {
    const [searchvalue, setsearchvalue] = useState("");
    return (
        <div className='row p-5'>
            <div className="col-6 offset-3">
                <h1>Search User</h1>
                <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Find User" autoComplete='off' onClick={(e)=>{setsearchvalue(e.target.value)}}/>
                <button class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
            </div>
            </div>
            <div className="col-6 offset-3">
                <ol>
                    <li>rohit</li>
                </ol>
            </div>
        </div>
    )
}

export default SearchProfile