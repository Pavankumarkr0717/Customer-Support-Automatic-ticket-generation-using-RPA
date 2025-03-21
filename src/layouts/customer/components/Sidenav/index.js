          <MDBox
            component={NavLink}
            to="/customer/chat-support"
            sx={{
              color: ({ palette: { white } }) => white.main,
              display: "flex",
              alignItems: "center",
              width: "100%",
              padding: "0.5rem 1rem",
              margin: "0.25rem 0",
              borderRadius: "0.375rem",
              cursor: "pointer",
              userSelect: "none",
              whiteSpace: "nowrap",
              textDecoration: "none",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
              "& .MuiIcon-root": {
                color: ({ palette: { white } }) => white.main,
              },
            }}
          >
            <Icon sx={{ mr: 1 }}>chat</Icon>
            <MDTypography variant="button" fontWeight="regular" color="white">
              Chat Support
            </MDTypography>
          </MDBox> 