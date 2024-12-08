import React, { useState } from "react";
import { Typography, Container, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "./TextDecrypt";
import Resume from "../../settings/resume.json";

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: "auto",
        marginBottom: "auto",
        "@media (max-width: 768px)": {
            marginLeft: theme.spacing(4),
        },
    },
    button: {
        marginTop: theme.spacing(3),
    },
    dateHeading: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
        textAlign: "left",
        color: theme.palette.text.primary,
    },
    image: {
        maxWidth: "100%",
        height: "auto",
        borderRadius: theme.spacing(1),
        boxShadow: theme.shadows[3],
    },
}));

// Giả lập dữ liệu hình ảnh với ngày tháng
const imagesByDate = [
    {
        date: "2024-12-01",
        images: [
            "/images/a1.jpg",
            "/images/a2.jpg",
        ],
    },
    {
        date: "2024-12-02",
        images: [
            "/images/a3.jpg",
            "/images/a4.jpg",
        ],
    },
    {
        date: "2024-12-02",
        images: [
            "/images/call.jpg",
            "/images/a5.jpg",
        ],
    },
];

export const Content = () => {
    const classes = useStyles();
    const [showImages, setShowImages] = useState(false); // State để điều khiển hiển thị hình ảnh

    const handleToggleImages = () => {
        setShowImages((prev) => !prev); // Toggle trạng thái hiển thị
    };

    return (
        <Container component="main" className={`${classes.main}`} maxWidth="md">
            <Typography variant="h2" component="h1" gutterBottom>
                <TextDecrypt text={`${Resume.basics.x_title} ${Resume.basics.name}`} />
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                <TextDecrypt text={`a ${Resume.basics.job}`} />
                <TextDecrypt text={`from ${Resume.basics.location.country}`} />
                <TextDecrypt text={`github ${Resume.basics.url}`} />
            </Typography>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleToggleImages}
            >
                {showImages ? "Hide Images" : "Show Images"} {/* Đổi nút tùy trạng thái */}
            </Button>

            {/* Danh sách hình ảnh theo ngày tháng */}
            {showImages &&
                imagesByDate.map((entry, index) => (
                    <div key={index}>
                        <Typography variant="h6" className={classes.dateHeading}>
                            {`Ngày: ${entry.date}`}
                        </Typography>
                        <Grid container spacing={2}>
                            {entry.images.map((src, imgIndex) => (
                                <Grid
                                    item
                                    xs={12} // 1 hình trên 1 hàng với màn hình rất nhỏ
                                    sm={6} // 2 hình trên 1 hàng với màn hình nhỏ
                                    md={4} // 3 hình trên 1 hàng với màn hình lớn
                                    key={imgIndex}
                                >
                                    <img src={src} alt={`Image ${imgIndex + 1}`} className={classes.image} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ))}
        </Container>
    );
};

