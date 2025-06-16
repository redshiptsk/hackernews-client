import { observer } from "mobx-react-lite";
import { Divider, Flex, Typography } from "antd";


export const CommentsItem = observer(({ elem }) => {

    return (
        <Flex vertical style={{ border: '1px solid #333', textAlign: 'start' }}>
            <Typography.Text >{elem.text}</Typography.Text>
            <Flex wrap>
                <Typography.Text>Raiting: {elem?.score}</Typography.Text>
                <Divider type="vertical" />
                <Typography.Text>Author: {elem?.by}</Typography.Text>
                <Divider type="vertical" />
                <Typography.Text>Comments: {elem?.kids?.length || '0'}</Typography.Text>
            </Flex>
        </Flex>
    )
})