import { Box } from "@mui/material";

export default function FadeInWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        opacity: 0,
        animation: "fadeIn 2s ease forwards",
        "@keyframes fadeIn": {
          to: { opacity: 1 },
        },
      }}
    >
      {children}
    </Box>
  );
}
