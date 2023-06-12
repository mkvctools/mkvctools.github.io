import {google} from 'googleapis';

export async function getServerSideProps({query}){

    const auth = await google.auth.getClient({scopes:['https://www.googleapis.com/auth/spreadsheets.readonly' ]});

    const sheets = google.seehts({version:'v4',auth});
    const {id} = query;
    const range = `Sheet1!A${id}:F${id}`;
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range
    });

    const [Name,Website,Reports,Quellen,Ansprechpartner,Gemeinsamkeiten] = response.data.values;

    return{
        props:{
            Name,
            Website,
            Reports,
            Quellen,
            Ansprechpartner,
            Gemeinsamkeiten
        }
    }
}

export default function Post({Name,Website,Reports,Quellen,Ansprechpartner,Gemeinsamkeiten}){
    return <article>
        <h1>{Name}</h1>
        <div><p dangerouslySetInnerHTML={{__html: Website}}></p></div>
        <div><p dangerouslySetInnerHTML={{__html: Reports}}></p></div>
        <div><p dangerouslySetInnerHTML={{__html: Quellen}}></p></div>
        <div><p dangerouslySetInnerHTML={{__html: Ansprechpartner}}></p></div>
        <div><p dangerouslySetInnerHTML={{__html: Gemeinsamkeiten}}></p></div>
        
    </article>
}