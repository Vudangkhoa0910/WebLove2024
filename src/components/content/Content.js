import React, { useState } from "react";
import { Typography, Container, Button, Grid, MenuItem, Select, InputLabel, FormControl, Chip, Box } from "@material-ui/core";
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200, // Điều chỉnh chiều rộng
    },
    select: {
        width: "100%", // Làm cho Select rộng ra hết chiều ngang của FormControl
    },
    chips: {
        display: "flex",
        flexWrap: "wrap",
        gap: theme.spacing(1),
    },
    okButton: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
        },
        padding: theme.spacing(1, 2),
        fontSize: "0.875rem",
        borderRadius: theme.spacing(2),
        alignSelf: "center", // Để nút căn chỉnh với các phần tử khác
    },
    dateAndButton: {
        display: "flex",
        justifyContent: "space-between", // Căn chỉnh các phần tử nằm trong cùng một dòng
        alignItems: "center", // Căn giữa dọc
        width: "100%", // Đảm bảo box chiếm toàn bộ chiều rộng
    },
    selectContainer: {
        display: "flex",
        alignItems: "center", // Đảm bảo phần select và nút OK căn giữa dọc
        gap: theme.spacing(2), // Khoảng cách giữa Select và nút OK
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
        date: "2024-12-03",
        images: [
            "/images/call.jpg",
            "/images/a5.jpg",
        ],
    },
];

export const Content = () => {
    const classes = useStyles();
    const [showImages, setShowImages] = useState(false); // State để điều khiển hiển thị hình ảnh
    const [selectedDates, setSelectedDates] = useState([]); // State để lưu nhiều ngày đã chọn
    const [imagesToDisplay, setImagesToDisplay] = useState([]); // State để lưu hình ảnh cần hiển thị

    const handleToggleImages = () => {
        setShowImages((prev) => !prev); // Toggle trạng thái hiển thị
    };

    const handleDateChange = (event) => {
        const { value } = event.target;
        setSelectedDates(value); // Cập nhật mảng ngày đã chọn
    };

    const handleOkClick = () => {
        // Khi nhấn OK, lọc các hình ảnh của các ngày đã chọn
        const selectedImages = imagesByDate.filter(entry => selectedDates.includes(entry.date));
        setImagesToDisplay(selectedImages); // Cập nhật hình ảnh cần hiển thị
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

            {showImages && (
                <>
                    <Box className={classes.selectContainer}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="select-date-label">Select Dates</InputLabel>
                            <Select
                                labelId="select-date-label"
                                multiple
                                value={selectedDates}
                                onChange={handleDateChange}
                                label="Select Dates"
                                className={classes.select}
                            >
                                {imagesByDate.map((entry) => (
                                    <MenuItem key={entry.date} value={entry.date}>
                                        {entry.date}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Nút OK */}
                        <Button
                            variant="contained"
                            className={classes.okButton}
                            onClick={handleOkClick}
                            disabled={selectedDates.length === 0} // Disable nút nếu chưa chọn ngày nào
                        >
                            OK
                        </Button>
                    </Box>

                    {/* Hiển thị hình ảnh sau khi nhấn OK */}
                    {imagesToDisplay.length > 0 && (
                        <div>
                            {imagesToDisplay.map((entry) => (
                                <div key={entry.date}>
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
                        </div>
                    )}
                </>
            )}
        </Container>
    );
};
