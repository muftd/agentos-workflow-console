import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function App() {
  return (
    <div className="min-h-screen bg-background p-12">
      <div className="container max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Workflow Console Design System
          </h1>
          <p className="text-muted-foreground">
            Testing design system components and visual quality
          </p>
        </div>

        <Separator />

        {/* Typography */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Typography</h2>
          <div className="space-y-2">
            <p className="text-3xl font-bold">Heading 1 (3xl, bold)</p>
            <p className="text-2xl font-semibold">Heading 2 (2xl, semibold)</p>
            <p className="text-xl font-semibold">Heading 3 (xl, semibold)</p>
            <p className="text-lg font-medium">Heading 4 (lg, medium)</p>
            <p className="text-base">Body text (base)</p>
            <p className="text-sm text-muted-foreground">Small text (sm, muted)</p>
          </div>
        </section>

        <Separator />

        {/* Colors */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-16 w-full bg-background border rounded-md"></div>
              <p className="text-xs">Background</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 w-full bg-card border rounded-md"></div>
              <p className="text-xs">Card</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 w-full bg-primary rounded-md"></div>
              <p className="text-xs">Primary (Blue)</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 w-full bg-accent rounded-md"></div>
              <p className="text-xs">Accent (Green)</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 w-full bg-muted rounded-md"></div>
              <p className="text-xs">Muted</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 w-full bg-secondary rounded-md"></div>
              <p className="text-xs">Secondary</p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        <Separator />

        {/* Cards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>
                  This is a card description using muted foreground color
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Card content goes here. This demonstrates the clean card design with proper spacing and shadows.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Hover Effect</CardTitle>
                <CardDescription>
                  Hover over this card to see the shadow effect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  This card has a hover effect with smooth 200ms transition.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Badges */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-100 text-blue-700 border-transparent">Coach C</Badge>
            <Badge className="bg-green-100 text-green-700 border-transparent">Coach A</Badge>
            <Badge className="bg-purple-100 text-purple-700 border-transparent">Coach E</Badge>
            <Badge className="bg-orange-100 text-orange-700 border-transparent">Replit</Badge>
          </div>
        </section>

        <Separator />

        {/* Border Radius */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Border Radius</h2>
          <div className="flex gap-4">
            <div className="space-y-2">
              <div className="h-16 w-16 bg-primary rounded-sm"></div>
              <p className="text-xs">sm (3px)</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 w-16 bg-primary rounded-md"></div>
              <p className="text-xs">md (6px)</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 w-16 bg-primary rounded-lg"></div>
              <p className="text-xs">lg (9px)</p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Shadows */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Shadows</h2>
          <div className="flex gap-4">
            <div className="space-y-2">
              <div className="h-16 w-32 bg-card border shadow-sm rounded-lg"></div>
              <p className="text-xs">shadow-sm</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 w-32 bg-card border shadow rounded-lg"></div>
              <p className="text-xs">shadow</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 w-32 bg-card border shadow-md rounded-lg"></div>
              <p className="text-xs">shadow-md</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 w-32 bg-card border shadow-lg rounded-lg"></div>
              <p className="text-xs">shadow-lg</p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Step Node Preview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Step Node Preview</h2>
          <Card className="w-64 h-32 p-4 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">#01</span>
              <Badge className="bg-blue-100 text-blue-700 border-transparent">Coach C</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground truncate">knowledge-processing</p>
              <p className="text-xs text-muted-foreground/70 truncate">via Claude Code</p>
            </div>
            <p className="text-sm font-medium text-foreground truncate">Output: 常青笔记</p>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default App;
