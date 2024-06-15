import { styled } from 'styled-components'
import Colors from '../../constants/Color';
import Avatar from '../common/Avatar';
import ListBooks from '../search/ListBooks';

const Account = () => {
    return (
        <Box className='body'>
            <Col1>
                <BoxAvatar>
                    <Avatar></Avatar>
                    <p style={{ fontSize: '26px' }}>Quỳnh Phạm</p>
                </BoxAvatar>
                <BoxCenter>
                    <H1>5</H1>
                    <p>Sách đã đăng</p>
                </BoxCenter>
                <BoxApp className='flex'>
                    <BoxCenter>
                        <H1>10</H1>
                        <p>Đang thẽo dõi</p>
                    </BoxCenter>

                    <BoxCenter>
                        <H1>0</H1>
                        <p>Người theo dõi</p>
                    </BoxCenter>
                </BoxApp>

            </Col1>

            <Col2>
                <BoxTitle>
                    <p className='titleProfile'>Thư viện cá nhân</p>
                </BoxTitle>
                
                <BoxOption>
                    <p className='optionProfile'>Sách đã đăng</p>               
                </BoxOption>
                <div id='library'>
                    <ListBooks></ListBooks>
                </div>
            </Col2>
        </Box>
    );
};

export default Account;

const Box = styled.div`
    display: flex;
`;

const Col1 = styled.div`
    width: 300px;
    margin: 20px;
    flex-shrink: 0;
`;

const Col2 = styled.div`
    flex-grow: 1;
    padding: 15px 0 20px 40px;
    margin: 40px 20px;
    border-left: 1px solid ${Colors.bg_dark};
`;

const BoxAvatar = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    align-items: center;
    gap: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${Colors.bg_dark};
`;

const BoxOption = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    padding: 15px 0;
    border-bottom: 1px solid ${Colors.bg_dark};
`;

const H1 = styled.p`
    font-size: 26px;
    font-weight: bold;
`;

const BoxApp = styled.div`
    justify-content: center;
    gap: 40px;
`;

const BoxCenter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
`;

const BoxTitle = styled.div`
    display: flex;
    align-items: center ;
    justify-content: space-between;
`;
