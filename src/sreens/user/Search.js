import React, { useState } from 'react';
import { styled } from 'styled-components'
import Colors from '../../constants/Color';
import ListBooks from '../../components/search/ListBooks';
import ListAccounts from '../../components/search/ListAccounts';

const Box = styled.div`
    display: flex;
`;

const Col1 = styled.div`
    width: 280px;
    margin: 20px;
    flex-shrink: 0;
`;

const Col2 = styled.div`
    flex-grow: 1;
    padding: 15px 0 20px 40px;
    margin: 20px;
    border-left: 1px solid ${Colors.bg_dark};
`;

const BoxH1 = styled.div`
    padding: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid ${Colors.bg_dark};
`;

const H1 = styled.p`
    font-size: 17px;
    color: ${Colors.white};
`;

const BoxFlex = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding-bottom: 15px;
    justify-content: space-between;
`;

const Selection = styled.select`
    height: 30px;
    padding: 0 5px;
    border-radius: 5px;
    width: 200px;
`;

const SearchBox = styled.input`
    height: 40px;
    flex: 1;
    border-radius: 5px;
    padding: 0 10px;
    border: 1px solid ${Colors.green_button};
`;

const ButtonSearch = styled.button`
    height: 40px;
    padding: 0 20px;
    border-radius: 20px;
    border: none;
    font-size: 15px;
    margin-left: 25px;
`;

const StyledBoxSelect = styled.button`
    border-radius: 5px;
    height: 100%;
    border: none;
    padding: 0 10px;
    font-size: 14px;
`;

const BoxSelect = styled.div`
    display: flex;
    height: 30px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
`;

const BoxContent = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding-bottom: 15px;
    gap: 30px; 
    border-bottom: 1px solid ${Colors.bg_dark};
`;

const Search = () => {
    const [activeElement, setActiveElement] = useState('book');

    function renderContent() {
        return (
            <div>
                <BoxContent>
                    <p id="book" className={activeElement === 'book' ? 'optionProfile cursor iconColor' : 'optionProfile cursor'} onClick={() => setActiveElement('book')}>Sách</p>
                    <p id="account" className={activeElement === 'account' ? 'optionProfile cursor iconColor' : 'optionProfile cursor'} onClick={() => setActiveElement('account')}>Tài khoản</p>
                </BoxContent>
                {activeElement === 'book' && <div>
                    <div style={{margin: '20px 0'}}>
                        <ListBooks></ListBooks>
                    </div>
                </div>}
                {activeElement === 'account' && <div>
                    <div style={{margin: '20px 0'}}>
                        <ListAccounts></ListAccounts>
                    </div>
                </div>}
            </div>
        );
    }

    return (
        <Box className='body'>
            <Col1>
                <BoxH1>
                    <H1>Bộ lọc <i class="fa-solid fa-filter"></i></H1>
                </BoxH1>
                <div>
                    <BoxFlex>
                        <label for="progress">Tình trạng:</label>
                        <Selection name='progress' id='progress' className='collection'>
                            <option value="" selected disabled hidden>Chọn tình trạng sách</option>
                            <option value="1">Đang tiến hành</option>
                            <option value="2">Đã hoàn thành</option>
                            <option value="3">Tạm ngưng</option>
                        </Selection>
                    </BoxFlex>

                    <BoxFlex>
                        <label for="classify">Loại sách:</label>
                        <Selection name='classify' id='classify' className='collection'>
                            <option value="" selected disabled hidden>Chọn loại sách</option>
                            <option value="1">Miễn phí</option>
                            <option value="2">Theo dõi</option>
                            <option value="3">Trả phí</option>
                        </Selection>
                    </BoxFlex>

                    <BoxFlex>
                        <label for='categoris'>Phân loại:</label>
                        <Selection name='categoris' id='categoris' className='collection'>
                            <option value="" selected disabled hidden>Thể loại sách</option>
                            <option value="1">Miễn phí</option>
                            <option value="2">Theo dõi</option>
                            <option value="3">Trả phí</option>
                        </Selection>
                    </BoxFlex>
                </div>
            </Col1>

            <Col2>
                <BoxFlex>
                    <SearchBox type="text" placeholder="Tìm theo tên sách, tên tài khoản"></SearchBox>
                    <ButtonSearch className='button'>Tìm kiếm</ButtonSearch>
                </BoxFlex>
                {renderContent()}
                <BoxSelect>
                    <select style={{height: '100%'}}>
                        <option value="1">Trang 1</option>
                        <option value="2">Trang 2</option>
                        <option value="3">Trang 3</option>
                        <option value="4">Trang 4</option>
                    </select>

                    <StyledBoxSelect className="button">Đến</StyledBoxSelect>
                    <p>Hiển thị 50 kết quả từ 1-50 trên tổng 230 kết quả</p>

                </BoxSelect>    
            </Col2>
        </Box>
    );
};

export default Search;