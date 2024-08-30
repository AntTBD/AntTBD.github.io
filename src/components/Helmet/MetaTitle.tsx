import {Helmet} from 'react-helmet-async';

export default function MetaTitle(title: string) {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}