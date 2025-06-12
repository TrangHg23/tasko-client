import { VisibilityOff, Visibility } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton, useTheme, useMediaQuery } from "@mui/material";

type InputFieldProps = {
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
}

const InputField = ({ type, label, value, onChange, onBlur, error, helperText, showPasswordToggle, onTogglePassword }: InputFieldProps) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <TextField
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      fullWidth
      variant="outlined"
      label={label}
      size={isSmall ? 'small' : 'medium'}
      slotProps={{
        input: showPasswordToggle ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onTogglePassword} edge="end">
              {type === 'password' ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      } : undefined
      }}
    />
  );
};

export default InputField;