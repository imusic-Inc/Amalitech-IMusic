import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function LoadingSession() {
    return (
        <div className='z-index-5'>
    <div className='p-2'></div>
             <SkeletonTheme baseColor = "#201D1D" highlightColor = "#444" >
        <p><Skeleton count={1} /></p>
                <div><Skeleton count={1} height={200} /></div>
                <p><Skeleton count={2} /></p>
            </SkeletonTheme>
            <div className='p-2'></div>
             <SkeletonTheme baseColor = "#201D1D" highlightColor = "#444" >
        <p><Skeleton count={1} /></p>
                <div><Skeleton count={1} height={200} /></div>
                <p><Skeleton count={2} /></p>
            </SkeletonTheme>
            <div className='p-2'></div>
             <SkeletonTheme baseColor = "#201D1D" highlightColor = "#444" >
        <p><Skeleton count={1} /></p>
                <div><Skeleton count={1} height={200} /></div>
                <p><Skeleton count={2} /></p>
            </SkeletonTheme>
            <div className='p-2'></div>
             <SkeletonTheme baseColor = "#201D1D" highlightColor = "#444" >
        <p><Skeleton count={1} /></p>
                <div><Skeleton count={1} height={200} /></div>
                <p><Skeleton count={2} /></p>
            </SkeletonTheme>
            <div className='p-2'></div>
             <SkeletonTheme baseColor = "#201D1D" highlightColor = "#444" >
        <p><Skeleton count={1} /></p>
                <div><Skeleton count={1} height={200} /></div>
                <p><Skeleton count={2} /></p>
            </SkeletonTheme>
            <div className='p-2'></div>
             <SkeletonTheme baseColor = "#201D1D" highlightColor = "#444" >
        <p><Skeleton count={1} /></p>
                <div><Skeleton count={1} height={200} /></div>
                <p><Skeleton count={2} /></p>
            </SkeletonTheme>
        </div>)
    
}

export function SessionTrack() {
    return (
        <div className='z-index-5'>
    <div className='p-2'></div>
             <SkeletonTheme baseColor = "#201D1D" highlightColor = "#444" >
                <div><Skeleton count={1} width={200} height={200} /></div>
                <p><Skeleton count={2} /></p>
            </SkeletonTheme>
        </div>)
    
}

export function SearchLoading() {
    return (
        <div className='z-index-5'>
    <div className='p-2'></div>
             <SkeletonTheme baseColor = "#201D1D" highlightColor = "#444" >
                <div><Skeleton count={1}  height={70} /></div>
            </SkeletonTheme>
             <SkeletonTheme baseColor = "#201D1D" highlightColor = "#444" >
                <div><Skeleton count={1}  height={70} /></div>
            </SkeletonTheme>
             <SkeletonTheme baseColor = "#201D1D" highlightColor = "#444" >
                <div><Skeleton count={1}  height={70} /></div>
            </SkeletonTheme>
             <SkeletonTheme baseColor = "#201D1D" highlightColor = "#444" >
                <div><Skeleton count={1}  height={70} /></div>
            </SkeletonTheme>
             <SkeletonTheme baseColor = "#201D1D" highlightColor = "#444" >
                <div><Skeleton count={1}  height={70} /></div>
            </SkeletonTheme>
             <SkeletonTheme baseColor = "#201D1D" highlightColor = "#444" >
                <div><Skeleton count={1}  height={70} /></div>
            </SkeletonTheme>
            
        </div>)
    
}