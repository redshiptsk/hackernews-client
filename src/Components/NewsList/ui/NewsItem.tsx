import { Divider, Flex, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import type { INews } from "../../../types/types";

type TNewsItemProps = {
    id: number;
    news: INews;
}

export const NewsItem = observer(({ id, news }: TNewsItemProps) => {
    const date = new Date(news?.time * 1000).toString()

    return (
        <>
            <Link to={`${id}`}>
                <Flex vertical align="start">
                    <Typography.Title level={3}>
                        {news?.title}
                    </Typography.Title>
                    <Flex>
                        <Typography.Text>Raiting: {news?.score}</Typography.Text>
                        <Divider type="vertical" />
                        <Typography.Text>Author: {news?.by}</Typography.Text>
                        <Divider type="vertical" />
                        <Typography.Text>Publicated: {date}</Typography.Text>
                        <Divider type="vertical" />
                        <Typography.Text>Comments: {news?.kids?.length || '0'}</Typography.Text>
                    </Flex>
                </Flex>
            </Link>
            <Divider />
        </>
    );
})