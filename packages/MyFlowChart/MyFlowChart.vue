<template>
    <div class="myFlowChart">
        <div id="mountNode" style="width:500px;border:1px solid #000">
            <ul ref="contextMenu" class="contextMenu">
                <li @click="removeNode">删除</li>
            </ul>
            <ul ref="contextMenuEdge" class="contextMenu">
                <li @click="removeEdge">删除</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import G6 from '@antv/g6';
    export default {
        name: 'MyFlowChart',
        props: {
            msg: String
        },
        data() {
            return {
                clickItem: '',
                graphObj: null,
                initData: {
                    nodes: [{
                        id: 'node1',
                        x: 100,
                        y: 200,
                        label: 1
                    },{
                        id: 'node2',
                        x: 300,
                        y: 200,
                        label: 2
                    },{
                        id: 'node3',
                        x: 300,
                        y: 300,
                        label: 3
                    }],
                    edges: [{
                        id: 'edge1',
                        target: 'node2',
                        source: 'node1'
                    }]
                }
            }
        },
        computed: {
            menu() {
                return this.$refs.contextMenu
            } ,
            menu_edge() {
                return this.$refs.contextMenuEdge
            }
        },
        mounted() {
            //拖动边事件
            G6.registerBehavior('drag-edge', {
                getEvents() {
                    return {
                        mousemove: 'onMousemove',
                        'edge:mousedown': 'onMouseDown'
                    };
                },
                onMouseDown(ev) {
                    if(ev.originalEvent.button === 0) this.setEdgeControlPoint = !this.setEdgeControlPoint
                },
                onMouseUp() {
                    this.setEdgeControlPoint = false
                },
                //边随鼠标移动
                onMousemove(ev) {
                    const point = {
                        x: ev.x,
                        y: ev.y
                    };
                    if(this.setEdgeControlPoint && ev.item) {
                        let edge = ev.item;
                        this.graph.updateItem(edge, {
                            controlPoints: [point]
                        });
                    } else {
                        this.setEdgeControlPoint = false
                    }
                }
            });
            //创建添加边事件
            G6.registerBehavior('click-add-edge', {
                getEvents() {
                    return {
                        'node:click': 'onClick',
                        mousemove: 'onMousemove',
                        'edge:click': 'onEdgeClick' // 点击空白处，取消边
                    };
                },
                onClick(ev) {
                    const node = ev.item;
                    const graph = this.graph;
                    const point = {
                        x: ev.x,
                        y: ev.y
                    };
                    const model = node.getModel();
                    if (this.addingEdge && this.edge) {
                        let flag1 = this.edge._cfg.source._cfg.id !== model.id; //禁止节点自己连接自己
                        //禁止重复边和起止相反的边
                        let flag2 = graph.getEdges().filter(item => {
                            if(item._cfg.target._cfg) {
                                return item._cfg.target._cfg.id === model.id && item._cfg.source._cfg.id === this.edge._cfg.source._cfg.id ||
                                    item._cfg.source._cfg.id === model.id && item._cfg.target._cfg.id === this.edge._cfg.source._cfg.id
                            } else {
                                return false
                            }
                        }).length === 0
                        if(flag1 && flag2) {
                            graph.updateItem(this.edge, {
                                target: model.id
                            });
                        } else {
                            graph.removeItem(this.edge);
                        }
                        this.edge = null;
                        this.addingEdge = false;
                    } else {
                        this.edge = graph.addItem('edge', {
                            source: model.id,
                            target: point
                        });
                        this.addingEdge = true;
                    }
                },
                //边随鼠标移动
                onMousemove(ev) {
                    const point = {
                        x: ev.x,
                        y: ev.y
                    };
                    if (this.addingEdge && this.edge) {
                        // eslint-disable-next-line no-console
                        console.log(point)
                        this.graph.updateItem(this.edge, {
                            target: point
                        });
                    }
                },
                onEdgeClick(ev) {
                    const currentEdge = ev.item;
                    // 拖拽过程中，点击会点击到新增的边上
                    if (this.addingEdge && this.edge === currentEdge) {
                        this.graph.removeItem(this.edge);
                        this.edge = null;
                        this.addingEdge = false;
                    }
                }
            });
            //创建添加节点事件
            G6.registerBehavior('click-add-node', {
                getEvents() {
                    return {
                        'canvas:click': 'onClick'
                    };
                },
                onClick(ev) {
                    let name = prompt('请输入节点名称');
                    this.graph.addItem('node', {
                        x: parseInt(ev.x),
                        y: parseInt(ev.y),
                        id: new Date().getTime() + '', // 生成唯一的 id
                        label: name
                    });
                }
            });
            //初始化
            this.graphObj = new G6.Graph({
                container: 'mountNode',
                width: 500,
                height: 500,
                fitView: true,
                fitViewPadding: [20, 40, 50, 20],
                modes: {
                    default: [
                        'drag-canvas',
                        'zoom-canvas',
                        'drag-node',
                        'drag-edge',
                        'click-add-edge',
                        'click-add-node',
                        'click-select'
                    ],
                },
                defaultEdge: {
                    type: 'polyline',
                    style: {
                        cursor: 'pointer',
                        lineAppendWidth: 10,
                        radius: 10,
                        endArrow: true
                    },
                    label: '处置',
                    labelCfg: {
                        autoRotate: false,
                        style: {
                            stroke: 'white',
                            lineWidth: 10
                        },
                    }
                },
                // The node styles in different states
                nodeStateStyles: {
                    // The node styles in selected state, corresponds to the built-in click-select behavior
                    selected: {
                        stroke: '#666',
                        lineWidth: 2,
                        fill: 'steelblue'
                    }
                },
                // edgeStateStyles: {
                //     hover: {
                //         lineWidth: 5
                //     }
                // }
            });
            //加载默认数据
            this.graphObj.data(this.initData);
            //渲染
            this.graphObj.render();
            //右键点击节点显示菜单
            this.graphObj.on('node:contextmenu', (evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                this.menu.style.left = evt.clientX + 'px';
                this.menu.style.top = evt.clientY + 'px';
                this.clickItem = evt.item._cfg.id;
            });
            //鼠标离开节点关闭菜单
            this.graphObj.on('node:mouseleave', () => this.menu.style.left = '-100px');
            //右键点击边显示菜单
            this.graphObj.on('edge:contextmenu', (evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                this.menu_edge.style.left = evt.clientX + 'px';
                this.menu_edge.style.top = evt.clientY + 'px';
                this.clickItem = evt.item._cfg.id;
            });
            // //鼠标进入边打开hover状态
            // this.graphObj.on('edge:mouseenter', evt => this.graphObj.setItemState(evt.item, 'hover', true));
            //鼠标离开边关闭菜单和hover状态
            // eslint-disable-next-line no-unused-vars
            this.graphObj.on('edge:mouseleave', evt => {
                // this.graphObj.setItemState(evt.item, 'hover', false);
                this.menu_edge.style.left = '-100px'
            });
        },
        methods: {
            removeNode() {
                if(confirm('确定要删除该节点？')) {
                    this.graphObj.removeItem(this.clickItem);
                    this.menu.style.left = '-100px';
                }
            },
            removeEdge() {
                if(confirm('确定要删除该连接线？')) {
                    this.graphObj.removeItem(this.clickItem);
                    this.menu_edge.style.left = '-100px';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .contextMenu {
        position: absolute;
        list-style: none;
        padding: 10px 5px;
        left: -100px;
        background: #ccc;
        li {
            cursor: pointer;
        }
    }
</style>
