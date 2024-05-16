import React from 'react';
import HeaderCilent from '../../components/header/HeaderCilent';
import { styled } from 'styled-components'
import Book from '../../components/common/Book';
import Colors from '../../constants/Color';
import '../../components/styles/StyledHeader.css';
import Comment from '../../components/common/Comment';
import Header from '../../components/header/Header';


const Body = styled.div`
    background: linear-gradient(180deg, #000 0%, #343434 100%) no-repeat, #343434;
    background-size: 100% 900px;
`;

const BoxLinks = styled.div`
    width: 100%;
    margin: 20px 0;
`;

const Box = styled.div`
    display: flex;
`;

const Col1 = styled.div`
    width: 260px;
    margin: 20px;
    flex-shrink: 0;
`;

const Col2 = styled.div`
    flex-grow: 1;
    padding: 20px 20px 20px 50px;
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

const P = styled.p`
    display: inline-flex;
    color: ${Colors.white};
    margin-top: 10px;
    width: 100%;
    word-wrap: break-word;
    gap: 20px;
    align-items: center;
    text-align: justify;
`;

const Span = styled.span`
    color: ${Colors.white};
    font-weight: 600;
`;

const StyledButton = styled.button`
    height: 50px;
    padding: 0 40px;
    border: none;
    border-radius: 30px;
`;

const StyledBox = styled.div`
    display: flex;
    gap: 20px;
    margin: 20px 0;
    align-items: center;
`;

const TextTitle = styled.h3`
    margin: 40px 0;
`;

const StyledChapter = styled.div`
    width: 100%;
    background-color: ${Colors.white};
    padding: 10px 20px;
    margin: 5px 0;
    border-radius: 10px;
    justify-content: space-between;
`;

const BoxSelect = styled.div`
    display: flex;
    height: 30px;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
`;

const StyledBoxSelect = styled.button`
    border-radius: 5px;
    border: none;
    padding: 0 10px;
    font-size: 14px;
`;

const Categories = ({categories}) => {
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


function renderStars(rating) {
    let fullStars = Math.floor(rating);
    let emptyStars = 5 - fullStars;
    let stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<i class="fas fa-star"></i>); // Thẻ icon ngôi sao tô màu vàng
    }

    for (let i = 0; i < emptyStars; i++) {
        stars.push(<i class="far fa-star"></i>); // Thẻ icon ngôi sao không tô màu
    }

    return stars;
}

const Rating = ({rating}) => {
    return (
        <List>{renderStars(rating)}</List>
    );
}

const Overview = ({data}) => {
    const categories = data.categories;
    return (
        <div>
            <Header></Header>
            <Body className='body'>
                <BoxLinks>
                    <a className='nav' href='#'>Trang chủ</a>
                    <i class="fa-solid fa-angle-right navIcon"></i>
                    <a className='nav' href='#'>{data.title}</a>
                </BoxLinks>
                <Box>
                    <Col1>
                        <Book type={data.type} src={data.src}></Book>
                    </Col1>
                    <Col2>
                        <h3>{data.title}</h3>
                        <div>
                            <Categories categories={categories}></Categories>
                            <P><Span>Tác giả: </Span> {data.author}</P>
                            <P><Span>Tình trạng: </Span> {data.progress}</P>
                            <P><Span>Cập nhật gần nhất: </Span> 1 ngày trước</P>
                            <P><Span>Số chương: </Span> {data.chapters}</P>
                            <P><Span>Đánh giá: </Span> <Rating rating={data.rating}></Rating> {data.rating}</P>
                            <P><Span>Lượt đọc: </Span> {data.reading}</P>
                            <StyledBox>
                                <StyledButton className='button'><i class="fa-solid fa-book-open"></i> Đọc sách</StyledButton>
                                <i class="fa-regular fa-star iconColor btn icon"></i>
                                <i class="fa-regular fa-comments iconColor btn icon"></i>
                                <i class="fa-regular fa-share-from-square iconColor btn icon"></i>
                            </StyledBox>
                            <Span>Mô tả:</Span>
                            <P>{data.description}</P>
                        </div>
                        

                        <TextTitle>Mục lục</TextTitle>
                        <div>
                            <div>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                                <StyledChapter>hhhh</StyledChapter>
                            </div>
                            <BoxSelect>
                                <StyledBoxSelect type="button">Chọn trang</StyledBoxSelect>
                                <select>
                                    <option value="1">Trang 1</option>
                                    <option value="2">Trang 2</option>
                                    <option value="3">Trang 3</option>
                                    <option value="4">Trang 4</option>
                                </select>

                                <StyledBoxSelect className="button">Đến</StyledBoxSelect>

                            </BoxSelect>     
                        </div>
                    </Col2>
                </Box>
                <TextTitle>Bình luận</TextTitle>
                <Comment></Comment>
            </Body>
        </div>
    );
};

export default Overview;