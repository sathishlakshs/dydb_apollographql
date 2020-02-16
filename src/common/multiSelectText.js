import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

const keyPress = (name, e, ancestorStateChange, state, setValue) => {
  if (e.keyCode == 13) {
    if (e.target.value !== "") {
      const temp = [...state.form.skills];
      temp.push({ name: e.target.value });
      setValue("");
      ancestorStateChange(name, temp, undefined);
    }
  }
};

const handleDelete = (name, chips, index, ancestorStateChange) => {
  const id = chips[index].id;
  chips.splice(index, 1);
  ancestorStateChange(name, [...chips], id);
};

function MultiSelectTextField(props) {
  const [value, setValue] = useState("");
  const { fieldKey, ancestorStateChange, state, chips } = props;
  return (
    <>
      <div>
        <TextField
          required
          label="Skills"
          onChange={e => setValue(e.target.value)}
          onKeyDown={e =>
            keyPress(fieldKey, e, ancestorStateChange, state, setValue)
          }
          value={value}
        />
        <div>
          {chips.map((c, index) => (
            <Chip
              // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
              key={index}
              label={c.name}
              onDelete={e =>
                handleDelete(e, [...chips], index, ancestorStateChange)
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MultiSelectTextField;
