module.exports = function(RED) {
    function EL250_INPUT(config) {
        RED.nodes.createNode(this,config);
        var context = this.context();
        var node = this;
		this.config = config;
        this.state = {};

		
        this.on('input', function(msg) {
		  
                   

                           var in_entrada =  parseInt(node.config.entrada, 10);;
					       var in_entrada_end =  parseInt(node.config.end, 10);
						   var obj = JSON.parse(msg.payload);
        
        
											
										var ultimo = (obj.HEX.length - 1);
											  
									if (obj.HEX[0] === 2 && obj.HEX[ultimo] === 3 &&
										obj.HEX[1] === 1 && obj.HEX[2] === in_entrada_end) 
									{
												
											var bin = parseInt(obj.HEX[4], 10);
											var bin1 = parseInt(obj.HEX[3], 10);
											
											var bits = bin.toString(2);
											var bits1 = bin1.toString(2);
											var i;
										for (i = bits.length; i < 8; i++) { 
														 bits = "0" +bits;
												}
												
										for (i = bits1.length; i < 8; i++) { 
														 bits1 = "0" +bits1;
												}        
										   
										bits =   bits1+bits;                                       
																		  
									
									var out ={payload: bits[in_entrada],topic : node.config.topic,end : node.config.end,Entrada : node.config.entrada};
									
									 
									var entraIN = context.get('entraIN');
									
									  if (entraIN !== bits[in_entrada])
									  {
										
										context.set('entraIN',bits[in_entrada]);
										node.send(out);									
									  }

										  
								  
					
					            }		 
		      
		   
        
        });
		
    }
    RED.nodes.registerType("EL250_INPUT",EL250_INPUT);
};
