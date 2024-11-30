import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";
export default function MyAddLabels({
  label,
  onChangeLabels,
  disabled = false,
  defaultValues = [],
}) {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState(defaultValues);
  useEffect(() => {
    onChangeLabels(tags);
  }, [tags]);
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      setTags([...tags, inputValue]);
      setInputValue("");
    }
  };
  const handleDeleteTag = (tagToDelete) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };
  const addTag = () => {
    if (inputValue) {
      setTags([...tags, inputValue]);
      setInputValue("");
    }
  };
  return (
    <Box sx={{ my: 1 }}>
      <TextField
        disabled={disabled}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        label={label}
        fullWidth
        variant="outlined"
        InputProps={{
          endAdornment: (
            <Tooltip title="Tambien puedes precionar enter ⏎" placement="top">
              <Button variant="outlined" onClick={addTag}>
                Agregar
              </Button>
            </Tooltip>
          ),
        }}
      />
      <Box sx={{ mt: 1, textAlign: "center" }}>
        {tags.map((tag, index) => (
          <Chip
            disabled={disabled}
            key={index}
            label={tag}
            onDelete={() => handleDeleteTag(tag)}
            style={{ margin: "4px" }}
          />
        ))}
      </Box>
    </Box>
  );
}