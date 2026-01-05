'use client';
import React, { useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const NetworkTopology = () => {
    const graphRef = useRef();

    useEffect(() => {
        if (graphRef.current) {
            graphRef.current.d3Force('charge').strength(-100);
            graphRef.current.d3Force('link').distance(50);
            graphRef.current.d3Force('center').strength(0.1);
        }
    }, []);

    const generateGraphData = () => {
        const nodes = [{ id: 'hub', name: 'UBIT Hub', val: 20, color: '#E76F00' }];
        const links = [];
        for (let i = 1; i <= 50; i++) {
            nodes.push({ id: `node-${i}`, name: `Peer ${i}`, val: 2, color: 'rgb(109, 179, 63)' });
            links.push({ source: 'hub', target: `node-${i}` });
        }
        return { nodes, links };
    };

    return (
        <div className="h-[400px] rounded-2xl bg-neutral-900 border border-neutral-800 relative">
            <ForceGraph2D
                ref={graphRef}
                graphData={generateGraphData()}
                nodeLabel="name"
                nodeVal="val"
                nodeColor="color"
                linkColor={() => 'rgba(255,255,255,0.2)'}
                linkWidth={1}
                backgroundColor="transparent"
                enableZoomPanInteraction={false}
            />
        </div>
    );
};

export default NetworkTopology;
