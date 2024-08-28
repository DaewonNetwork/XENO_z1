"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";

const ProductCreateForm = () => {
    const [sections, setSections] = useState([{ id: Date.now(), productNumber: "", images: [], detailImage: null }]);
    const [excelFile, setExcelFile] = useState<File | null>(null);

    const accessToken = localStorage.getItem("access_token");

    const handleExcelFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setExcelFile(event.target.files[0]);
        }
    };

    const handleInputChange = (sectionId: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;

        setSections(prevSections => prevSections.map(section => {
            if (section.id === sectionId) {
                if (name === "productNumber") {
                    return { ...section, productNumber: value };
                } else if (name === "images") {
                    return { ...section, images: Array.from(files || []) };
                } else if (name === "detailImage") {
                    return { ...section, detailImage: files ? files[0] : null };
                }
            }
            return section;
        }));
    };

    const handleExcelUpload = async () => {
        if (!excelFile) {
            alert('엑셀 파일을 선택해 주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('excel', excelFile);

        try {
            const response = await fetch("http://localhost:8090/api/product/create", {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
                alert('엑셀 파일 업로드 성공');
                window.location.reload();
            } else {
                const errorText = await response.text();
                alert(`업로드 실패: ${errorText}`);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('엑셀 파일 업로드 중 오류가 발생했습니다.');
        }
    };

    const handleUploadAll = async () => {
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const formData = new FormData();
            formData.append('productNumber', section.productNumber);
            section.images.forEach(file => formData.append('productImages', file));
            if (section.detailImage) {
                formData.append('productDetailImage', section.detailImage);
            }

            try {
                const response = await fetch(`http://localhost:8090/api/product/upload`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: formData
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Success:', data);
                    alert(`섹션 ${i + 1}의 이미지가 업로드되었습니다.`);
                } else {
                    console.error('Upload failed:', response.statusText);
                    alert(`섹션 ${i + 1}의 업로드 실패`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert(`섹션 ${i + 1}의 업로드 중 오류가 발생했습니다.`);
            }
        }
        window.location.reload(); // 모든 업로드가 완료된 후 페이지 새로고침
    };

    const handleAddSection = () => {
        setSections([...sections, { id: Date.now(), productNumber: "", images: [], detailImage: null }]);
    };

    return (
        <>
            {/* 엑셀 파일 업로드 부분 */}
            <div>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleExcelFileChange}
                />
                <Button onClick={handleExcelUpload}>엑셀 등록하기</Button>
            </div>

            {/* 품번 입력 및 이미지 업로드 부분 */}
            {sections.map((section, index) => (
                <div key={section.id} className={styles.section}>
                    <div className={styles.field}>
                        <label>품번:</label>
                        <input 
                            type="text" 
                            name="productNumber"
                            value={section.productNumber}
                            onChange={(event) => handleInputChange(section.id, event)}
                            placeholder="품번 입력" 
                        />
                    </div>
                    <div className={styles.field}>
                        <label>이미지 6개 업로드:</label>
                        <input 
                            type="file" 
                            name="images"
                            accept="image/*" 
                            multiple 
                            onChange={(event) => handleInputChange(section.id, event)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>상세 이미지 업로드:</label>
                        <input 
                            type="file" 
                            name="detailImage"
                            accept="image/*" 
                            onChange={(event) => handleInputChange(section.id, event)}
                        />
                    </div>
                </div>
            ))}
            <Button onClick={handleAddSection}>추가</Button>
            <Button onClick={handleUploadAll}>모두 업로드</Button>
        </>
    );
};

export default ProductCreateForm;
