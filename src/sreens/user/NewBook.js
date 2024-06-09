import React, { useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components'
import Colors from '../../constants/Color';

const Box = styled.div`
    display: flex;
`;

const Col1 = styled.div`
    display: flex;
    width: 260px;
    margin: 20px;
    flex-shrink: 0;
    gap: 10px;
    align-items: center;
    flex-direction: column;
`;

const Col2 = styled.div`
    flex-grow: 1;
    padding: 0px 0 20px 40px;
    margin: 20px;
    border-left: 1px solid ${Colors.bg_dark};
`;

const BoxFlex = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding-bottom: 15px;
    gap: 12px;
`;

const Selection = styled.select`
    flex: 1;
    height: 35px;
    padding: 0 5px;
    border-radius: 5px;
`;

const Collection = styled.input`
    flex: 1;
    height: 35px;
    padding: 0 10px;
    border-radius: 5px;
`;

const Thumbnail = styled.div`
    height: 430px;
    width: 250px;
    margin: 10px 0;
    border-radius: 10px;
    border: 2px solid ${Colors.bg_dark};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

const ButtonThumbnail = styled.button`
    height: 40px;
    padding: 0 20px;
    border-radius: 20px;
    border: none;
    font-size: 15px;
`;

const Category = styled.div`
    display: flex;
    padding: 5px 10px;
    background-color: ${Colors.white};
    border-radius: 20px;
    font-size: 12px;
    color: ${Colors.black};
`;

const List = styled.div`
    display: flex;
    gap: 10px;
    color: ${Colors.yellow};
`;

const InputDescription = styled.textarea`
    flex: 1;
    height: 300px;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    font-size: 17px;
    font-family: Arial, Helvetica, sans-serif;
`;

const Button = styled.button`
    border-radius: 20px;
    height: 40px;
    padding: 0 20px;
    margin-right: 20px;
    border: none;
`;

const Categories = ({ categories }) => {
    return (
        <List>
            {categories.map((item, index) => {
                return (
                    <Category>{item}</Category>
                );
            })}
        </List>
    );
}

const CategoryComponent = () => {
    const [categories, setCategories] = useState([]);

    const handleSelectionChange = (event) => {
        const selectedValue = event.target.value;
        setCategories([...categories, selectedValue]);
    };

    return (
        <>
            <BoxFlex>
                <p>Thể loại:</p>
                <Categories categories={categories}></Categories>
            </BoxFlex>
            <BoxFlex>
                <Selection className='collection' onChange={handleSelectionChange}>
                    <option value="" selected disabled hidden>Chọn thể loại sách</option>
                    <option value="Sách tham khảo">Sách tham khảo</option>
                    <option value="Truyện">Truyện</option>
                    <option value="3">Trả phí</option>
                </Selection>
            </BoxFlex>
        </>
    );
}

const ChageThumbnail = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(URL.createObjectURL(event.target.files[0]));
    };

    const handleClick = () => {
        document.getElementById('myFile').click();
    };

    useEffect(() => {
        if (selectedFile) {
            document.getElementById('myDiv').style.backgroundImage = `url(${selectedFile})`;
        }
    }, [selectedFile]);

    return (
        <>
            <Thumbnail id="myDiv"></Thumbnail>
            <input type="file" id="myFile" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
            <ButtonThumbnail className='button' onClick={handleClick}>Tải lên ảnh</ButtonThumbnail>
        </>
    );
}

const NewBook = () => {
    const inputRef = useRef();
    return (
        <Box className='body'>
            <Col1>
                <ChageThumbnail></ChageThumbnail>
            </Col1>

            <Col2>
                <div id="headerCilent" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '25px' }}>
                    <Button className='button'><a href=''>Thêm mới sách</a></Button>
                    <Button className='btn'><a href='/'></a>Hủy bỏ</Button>
                </div>
                <div>
                    <BoxFlex>
                        <p>Tên sách:</p>
                        <Collection 
                            type='text' 
                            className='collection' 
                            placeholder='Nhập tên sách'
                            ref={inputRef}
                        ></Collection>
                    </BoxFlex>

                    <BoxFlex>
                        <p>Tác giả:</p>
                        <Collection type='text' className='collection' placeholder='Nhập tên tác giả'>
                        </Collection>
                    </BoxFlex>

                    <BoxFlex>
                        <p>Loại sách:</p>
                        <Selection className='collection'>
                            <option value="" selected disabled hidden>Chọn loại sách</option>
                            <option value="1">Miễn phí</option>
                            <option value="2">Theo dõi</option>
                            <option value="3">Trả phí</option>
                            <option value="4">Riêng tư</option>
                        </Selection>
                    </BoxFlex>
                    <CategoryComponent></CategoryComponent>
                    <div>
                        <p>Mô tả:</p>
                        <InputDescription className='collection'></InputDescription>
                    </div>
                </div>
            </Col2>
        </Box>
    );
};

export default NewBook;