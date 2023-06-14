import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

function BookStatus({ statusValue, setStatusValue, isEditing }) {
  return (
    <div>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={statusValue}
          onChange={(e) => {
            setStatusValue(e.target.value)
          }}
          name="radio-buttons-group"
          row
          sx={{ pointerEvents: isEditing ? "auto" : "none" }} // to disable the RadioGroup when is not editing
        >
          <FormControlLabel
            value="currently-reading"
            control={<Radio />}
            label="Currently reading"
          />
          <FormControlLabel
            value="want-to-read"
            control={<Radio />}
            label="Want to read"
          />
          <FormControlLabel
            value="finished-reading"
            control={<Radio />}
            label="Finished reading"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default BookStatus;
