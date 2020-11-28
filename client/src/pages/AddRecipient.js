import React, {useState} from 'react';
import axios from 'axios';

const AddRecipent = () => {

    const [state, setState] = useState({
      name: '',
      relationship: '',
      budget: '',
      image: null
    })

    const { name, relationship, budget, image } = state;

    const onChange = (e) => {
      setState({
        ...state,
        [e.target.name]: e.target.value,
        image: e.target.files[0]
      });
    };

    const onSubmit = async e => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('myfile', image);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      try {
        const response = await axios.post('http://localhost:3001/recipients', formData, config)
        return response.data
      } catch(err) {
        console.log(err)
      }

      setState({
        name: '',
        relationship: '',
        budget: '',
        file: null
      });
      
    };

  return (
    <div>
      <h3 className="center-align">Add Recipient</h3>
      <div className="row">
    <form className="col s6" onSubmit={e => onSubmit(e)}>
      <div className="row">
      <div className="input-field col s6 offset-s10">
        <input name="name" id="name" type="text" value={name}
        onChange={e => onChange(e)}
        className="validate" required/>
        <label htmlFor="name">Name</label>
      </div>
      </div>
      <div className="row">
        <div className="input-field col s6 offset-s10">
          <input name="relationship" id="relationship" type="text" value={relationship}
          onChange={e => onChange(e)} 
          className="validate" required/>
          <label htmlFor="relationship">Relationship</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6 offset-s10">
          <input name="budget" id="budget" type="number" value={budget}
          onChange={e => onChange(e)}
          className="validate" required/>
          <label htmlFor="budget">Budget</label>
        </div>
      </div>
      <div className="row">
        <div className="file-field input-field  col s6 offset-s10">
          <div class="btn">
            <span>File</span>
            <input type="file" />
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" onChange={e => onChange(e)}/>
          </div>
        </div>
      </div>
      <div className="col s6 offset-s10">
        <button className="btn waves-effect waves-light" type="submit" name="action">Submit
        </button>
      </div>
    </form>
  </div>
    </div>
  )
}

export default AddRecipent;