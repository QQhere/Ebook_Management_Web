import { styled } from 'styled-components'
import Colors from '../../constants/Color';
import Avatar from '../../components/common/Avatar';
import ListBooks from '../../components/search/ListBooks';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getUserById } from '../../services/api/User';
import { getAllBookByAccount, getAllBookByUser } from '../../services/api/Book';

const Account = () => {
    const { accountId } = useParams();
    const [dataUser, setDataUser] = useState({});
    const [listBooks, setListBooks] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchAccount = async () => {
        const response = await getUserById(accountId);
        if (response.status === "OK") {
            setDataUser(response.data);
        }
    }

    const fetchDataBook = async (userId) => {
        const response = await getAllBookByAccount(userId);
        if (response.status === "OK") {
            setListBooks(response.data);
        }
    };

    useEffect(() => {
        fetchAccount();
        fetchDataBook(accountId);
    }, []);

    return (
        <Box className='body'>
            <Col1>
                <BoxAvatar>
                    <p style={{ fontSize: '26px' }}>{dataUser.fullname}</p>
                    <Avatar avatar={dataUser.link_avatar}></Avatar>
                    <Button className="button">
                        Theo dõi
                    </Button>
                </BoxAvatar>
                <BoxCenter>
                    <H1>{listBooks.length}</H1>
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
                    <ListBooks data={listBooks}></ListBooks>
                </div>
            </Col2>
        </Box>
    );
};

export default Account;

const Button = styled.button`
  height: 40px;
  padding: 0 20px;
  border-radius: 20px;
  border: none;
`;

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
    margin: 40px 5px 40px 20px;
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
