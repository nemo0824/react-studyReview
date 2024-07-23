import styled from "styled-components";

const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    top: 0;
    background-color: black;
    color: white;
    padding: 20px 60px;
`

const Col = styled.div`
    display: flex;
    align-items: center;
`

const Items = styled.ul`
    display: flex;
    align-items: center;
`

const Item = styled.li`
    list-style: none;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

function Header() {
    return <>
    <Nav> 
        <Col>
            <Items>
                <Item>아이템 1</Item>
                <Item>아이템 2 </Item>
            </Items>
        </Col>
        <Col>
            <Items>
                <Item>아이템 1</Item>
                <Item>아이템 2 </Item>
            </Items>
        </Col>
    </Nav>
       
    </>
}


export default Header;