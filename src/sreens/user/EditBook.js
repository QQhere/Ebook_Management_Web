import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components'
import Colors from '../../constants/Color';
import TabletOfContents from '../../components/common/TabletOfContents';
import { Link } from 'react-router-dom';

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
            <Button className='button' onClick={handleClick}>Tải lên ảnh</Button>
        </>
    );
}

const listChapter = [
    {
        index: 1,
        name: 'Chương 1: Cuộc gọi lúc nửa đêm bla blabalancdsvegfffffffffffffffff ffffffff',
    },
    {
        index: 2,
        name: 'Chương 1',
    },
    {
        index: 3,
        name: 'Chương 1',
    },
    {
        index: 4,
        name: 'Chương 1',
    },
    {
        index: 5,
        name: 'Chương 1',
    },
]

const EditBook = () => {
    const [addNewChapter, setAddNewChapter] = useState(false);
    const newChapter = () => {
        setAddNewChapter(!addNewChapter);
    }
    return (
        <div>

            <Box className='body'>
                <Col1>
                    <ChageThumbnail></ChageThumbnail>
                </Col1>

                <Col2>
                    <div id="headerCilent" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '25px', gap: '20px' }}>
                        <Button className='button'><a href=''>Lưu thay đổi</a></Button>
                        <Button className='btn'><a href=''></a>Hủy bỏ</Button>
                    </div>
                    <div>
                        <BoxFlex>
                            <p>Tên sách:</p>
                            <Collection type='text' className='collection' placeholder='Nhập tên sách'>
                            </Collection>
                        </BoxFlex>

                        <BoxFlex>
                            <p>Tác giả:</p>
                            <Collection type='text' className='collection' placeholder='Nhập tên tác giả'>
                            </Collection>
                        </BoxFlex>

                        <BoxFlex>
                            <p>Tình trạng:</p>
                            <Selection className='collection'>
                                <option value="" selected disabled hidden>Chọn tình trạng sách</option>
                                <option value="1">Miễn phí</option>
                                <option value="2">Theo dõi</option>
                                <option value="3">Trả phí</option>
                            </Selection>
                        </BoxFlex>
                        <BoxFlex>
                            <p>Loại sách:</p>
                            <Selection className='collection'>
                                <option value="" selected disabled hidden>Chọn loại sách</option>
                                <option value="1">Miễn phí</option>
                                <option value="2">Theo dõi</option>
                                <option value="3">Trả phí</option>
                            </Selection>
                        </BoxFlex>
                        <CategoryComponent></CategoryComponent>
                        <div>
                            <p>Mô tả:</p>
                            <InputDescription className='collection'></InputDescription>
                        </div>
                    </div>

                    <div>
                        <BoxContent>
                            <h3 style={{ margin: '0' }}>Mục lục</h3>
                            <div onClick={newChapter}>
                                <p className="link">
                                    Thêm mới <i class="fa-solid fa-add"></i>
                                </p>
                            </div>
                        </BoxContent>

                        <TabletOfContents data={listChapter} type='edit'></TabletOfContents>
                    </div>
                </Col2>
            </Box>

            {addNewChapter ? <div>
                <Cover onClick={newChapter}></Cover>
                <BoxAddChapter>
                    <Header>
                        <P>Thêm mới chương</P>
                        <ClosedButton onClick={newChapter}><i class="fa-solid fa-xmark"></i></ClosedButton>
                    </Header>
                    <Content>
                        <BoxFlex>
                            <p>Tên chương:</p>
                            <Collection
                                type="text"
                                className="collection"
                                placeholder="Nhập tên chương"
                            ></Collection>
                        </BoxFlex>
                        <Button className='button'>
                            Tải lên nội dung
                        </Button>
                    </Content>
                </BoxAddChapter>
            </div> : <div> </div>}
        </div>
    );
};

export default EditBook;

const BoxAddChapter = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    background-color: ${Colors.bg_dark};
    z-index: 1000;
    border-radius: 20px;   
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid ${Colors.dark_grey};
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin: 30px;
    justify-content: center;
    gap: 10px;
`;

const ClosedButton = styled.button`
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 0 20px 0 0;
    background-color: transparent;
    color: ${Colors.white};
    font-size: 18px;
`;

const P = styled.p`
    font-size: 15px;
    margin-left: 30px;
`;

const Cover = styled.div`
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${Colors.dark_grey};
    opacity: 0.7;
    z-index: 10;
`;

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

const BoxContent = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding-bottom: 15px;
    gap: 12px;
    justify-content: space-between;
    margin: 20px 0;
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

const Button = styled.button`
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
