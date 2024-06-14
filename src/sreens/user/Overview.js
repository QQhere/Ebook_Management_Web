import React from 'react';
import { styled } from 'styled-components'
import Book from '../../components/common/Book';
import Colors from '../../constants/Color';
import '../../components/styles/StyledHeader.css';
import Comment from '../../components/common/Comment';
import TabletOfContents from '../../components/common/TabletOfContents';
import { DataBook } from '../../dataBook';

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
    font-size: 17px;
`;

const Span = styled.span`
    color: ${Colors.white};
    font-weight: 600;
    font-size: 17px;
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
                    <Category>{item.name}</Category>          
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

const Overview = () => {
    const data = DataBook.data;
    const categories = data.categories;
    const { time_dmy } = require('../../function/time');
    return (
            <div className='body'>
                <BoxLinks>
                    <a className='nav' href='#'>Trang chủ</a>
                    <i class="fa-solid fa-angle-right navIcon"></i>
                    <a className='nav' href='#'>{data.title}</a>
                </BoxLinks>
                <Box>
                    <Col1>
                        <Book type={data.type_of_book} src={data.image}></Book>
                    </Col1>
                    <Col2>
                        <h3>{data.title}</h3>
                        <div>
                            <Categories categories={categories}></Categories>
                            <P><Span>Tác giả: </Span> {data.authors.map(author => author.name).join(', ')}</P>
                            <P><Span>Tình trạng: </Span> {data.status}</P>
                            <P><Span>Cập nhật gần nhất: </Span>{time_dmy(data.updated_at)}</P>
                            <P><Span>Số chương: </Span> {data.chapters.length}</P>
                            <P><Span>Đánh giá: </Span> <Rating rating='4.3'></Rating> 4.3</P>
                            <P><Span>Lượt đọc: </Span> {data.number_reads}</P> 
                            <StyledBox>
                                <StyledButton className='button'><i class="fa-solid fa-book-open"></i> Đọc sách</StyledButton>
                                <i class="fa-regular fa-star iconColor btn icon"></i>
                                <i class="fa-regular fa-comments iconColor btn icon"></i>
                                <i class="fa-regular fa-share-from-square iconColor btn icon"></i>
                            </StyledBox>
                            <Span>Mô tả:</Span>
                            <P>{data.summary}</P>
                        </div>
                        

                        <TextTitle>Mục lục</TextTitle>
                        <div>
                            <TabletOfContents data={data.chapters} type='overview'></TabletOfContents>
                            <BoxSelect>
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
                <Comment haha='hhh'></Comment>
                <Comment haha='jjj'></Comment>
            </div>
    );
};

export default Overview;