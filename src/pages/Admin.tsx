import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Session } from '@supabase/supabase-js';
import { Plus, Edit, Trash2, LogOut } from "lucide-react";

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  whatsapp_number: string;
  image_urls: string[];
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    whatsapp_number: '',
    image_urls: ''
  });

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate('/auth');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate('/auth');
      } else {
        fetchProperties();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch properties",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const resetForm = () => {
    setFormData({
      title: '',
      price: '',
      location: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      description: '',
      whatsapp_number: '',
      image_urls: ''
    });
    setEditingProperty(null);
  };

  const openDialog = (property?: Property) => {
    if (property) {
      setEditingProperty(property);
      setFormData({
        title: property.title,
        price: property.price.toString(),
        location: property.location,
        bedrooms: property.bedrooms.toString(),
        bathrooms: property.bathrooms.toString(),
        area: property.area.toString(),
        description: property.description || '',
        whatsapp_number: property.whatsapp_number,
        image_urls: property.image_urls.join(', ')
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const propertyData = {
      title: formData.title,
      price: parseFloat(formData.price),
      location: formData.location,
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      area: parseInt(formData.area),
      description: formData.description,
      whatsapp_number: formData.whatsapp_number,
      image_urls: formData.image_urls.split(',').map(url => url.trim()).filter(Boolean)
    };

    try {
      if (editingProperty) {
        const { error } = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', editingProperty.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Property updated successfully" });
      } else {
        const { error } = await supabase
          .from('properties')
          .insert([propertyData]);
        
        if (error) throw error;
        toast({ title: "Success", description: "Property created successfully" });
      }
      
      setIsDialogOpen(false);
      resetForm();
      fetchProperties();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save property",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Success", description: "Property deleted successfully" });
      fetchProperties();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Property Management</h1>
            <p className="text-muted-foreground">Manage your property listings</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/')} variant="outline">
              View Site
            </Button>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Properties</CardTitle>
                <CardDescription>
                  {properties.length} properties in your listing
                </CardDescription>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => openDialog()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Property
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProperty ? 'Edit Property' : 'Add New Property'}
                    </DialogTitle>
                    <DialogDescription>
                      Fill in the property details below
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bedrooms">Bedrooms</Label>
                        <Input
                          id="bedrooms"
                          type="number"
                          value={formData.bedrooms}
                          onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bathrooms">Bathrooms</Label>
                        <Input
                          id="bathrooms"
                          type="number"
                          value={formData.bathrooms}
                          onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="area">Area (sq ft)</Label>
                        <Input
                          id="area"
                          type="number"
                          value={formData.area}
                          onChange={(e) => setFormData({...formData, area: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
                      <Input
                        id="whatsapp_number"
                        value={formData.whatsapp_number}
                        onChange={(e) => setFormData({...formData, whatsapp_number: e.target.value})}
                        placeholder="+1234567890"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image_urls">Image URLs (comma separated)</Label>
                      <Textarea
                        id="image_urls"
                        value={formData.image_urls}
                        onChange={(e) => setFormData({...formData, image_urls: e.target.value})}
                        placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingProperty ? 'Update' : 'Create'} Property
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Beds/Baths</TableHead>
                  <TableHead>WhatsApp</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium">{property.title}</TableCell>
                    <TableCell>{property.location}</TableCell>
                    <TableCell>${property.price.toLocaleString()}</TableCell>
                    <TableCell>{property.bedrooms}/{property.bathrooms}</TableCell>
                    <TableCell>{property.whatsapp_number}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openDialog(property)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(property.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {properties.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No properties found. Add your first property to get started.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;