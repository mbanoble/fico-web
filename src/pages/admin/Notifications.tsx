
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Notifications = () => {
  const [messageType, setMessageType] = useState<string>("email");
  const [recipient, setRecipient] = useState<string>("all");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSendMessage = () => {
    // This would integrate with Supabase to send real notifications
    toast({
      title: "Notification sent",
      description: `${messageType.toUpperCase()} message has been sent to ${recipient === 'all' ? 'all users' : 'selected users'}.`,
    });
    
    setSubject("");
    setMessage("");
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-gray-500 mt-1">Send messages to app users</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Send New Message</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message Type</label>
                  <Select defaultValue="email" onValueChange={setMessageType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="app">In-App Notification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Recipients</label>
                  <Select defaultValue="all" onValueChange={setRecipient}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="active">Active Users</SelectItem>
                      <SelectItem value="pending">Users with Pending Loans</SelectItem>
                      <SelectItem value="late">Users with Late Payments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input 
                  placeholder="Enter message subject" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea 
                  placeholder="Enter your message content" 
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => setIsDialogOpen(true)} 
                  disabled={!subject || !message}
                >
                  Send Message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-gray-500">
              <p>No messages sent recently</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Message Type</p>
              <p className="text-sm">{messageType.toUpperCase()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Recipients</p>
              <p className="text-sm">
                {recipient === 'all' ? 'All Users' : 
                 recipient === 'active' ? 'Active Users' : 
                 recipient === 'pending' ? 'Users with Pending Loans' :
                 'Users with Late Payments'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Subject</p>
              <p className="text-sm">{subject}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Message</p>
              <p className="text-sm whitespace-pre-line">{message}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSendMessage}>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Notifications;
