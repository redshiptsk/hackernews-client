import { observer } from "mobx-react-lite";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { INews } from "../../types/types";
import Link from "antd/es/typography/Link";
import { Divider, Flex, Typography } from "antd";
import { CommentSection } from "./ui/CommentSection/CommentsSection";

export const FullNewsPage = observer(() => {
    const { id } = useParams();
    const [newsData, setNewsData] = useState<INews | null>(null)

    const formatDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleString();
    };
    
    useEffect(() => {
        const fetchNews = async () => {
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                .then((res) => res.json())
                .then((res) => setNewsData(res))
        }
        fetchNews();
    }, [id]);

    const date = new Date(newsData?.time * 1000).toString()
    return (
        <Flex vertical  style={{width: '98%', marginLeft: "10px"}} align="flex-start" justify="flex-start">
            <Flex align="center">
                <NavLink style={{ fontSize: '18px' }} to={'/'}>Go Back</NavLink>
                <Typography.Title>{newsData?.title}
                </Typography.Title>
                <Divider type="vertical"/>
                <Link style={{ fontSize: '18px' }} href={newsData?.url}>Link to news</Link>
            </Flex>
            <Typography.Text>Raiting: {newsData?.score}</Typography.Text>
            <Divider type="vertical" />
            <Typography.Text>Author: {newsData?.by}</Typography.Text>
            <Divider type="vertical" />
            <Typography.Text>Published: {formatDate(newsData?.time)}</Typography.Text>
            <Divider type="vertical" />
            <Typography.Text style={{fontSize: '18px'}}>Comments: {newsData?.kids?.length || '0'}</Typography.Text>
        
            <CommentSection storyId={id} />
        </Flex>
    );
})